import {FilterType} from "../App";
import {Dispatch} from "redux";
import {todoListApi, TodoListDomainType} from "../api/api";
import {createTasksAC} from "./tasksReducer";

// Reducer
export const todoListReducer = (state: TodolistType[] = [], action: MainActionType): TodolistType[] => {
    switch (action.type) {
        case "SET-TODOLIST":
            return action.payload.todoLists.map(tl => ({...tl, filter: "all"}))
        case "REMOVE-TODO-LIST":
            return state.filter(f => f.id !== action.payload.todoListId)
        case "CREATE-TODOLIST":
            return [{...action.payload.todoList, filter: "all"}, ...state]
        case "CHANGED-TODO-LIST-TITLE":
            return state.map(t => t.id === action.payload.todoListId ? {...t, title: action.payload.newTitle} : t)
        case "TASKS-FILTER":
            return state.map(t => t.id === action.payload.todoListId ? {...t, filter: action.payload.filter} : t)
        default:
            return state
    }
}

// Action creator
export const setTodoList = (todoLists: TodoListDomainType[]) => ({
    type: 'SET-TODOLIST',
    payload: {
        todoLists
    }
} as const)
export const removeTodoListAC = (todoListId: string) => ({
        type: 'REMOVE-TODO-LIST',
        payload: {
            todoListId
        }
    } as const)
export const createTodoListAC = (todoList: TodoListDomainType) => ({
        type: 'CREATE-TODOLIST',
        payload: {
            todoList
        }
    } as const)
export const changedTodoListTitleAC = (todoListId: string, newTitle: string) => ({
        type: 'CHANGED-TODO-LIST-TITLE',
        payload: {
            todoListId,
            newTitle,
        }
    } as const)
export const tasksFilterAC = (todoListId: string, filter: FilterType) => ({
      type: 'TASKS-FILTER',
      payload: {
          todoListId,
          filter
      }
  } as const)

// Thunk creator
export const getTodoListAT = () => (dispatch: Dispatch) => {
    todoListApi.getTodoLists()
        .then(res => {
            dispatch(setTodoList(res))
    })
}
export const removeTodoListAT = (todoListId: string) => (dispatch: Dispatch) => {
    todoListApi.removeTodoList(todoListId)
        .then(res => {
        dispatch(removeTodoListAC(todoListId))
    })
}
export const createTodoListAT = (title: string) => (dispatch: Dispatch) => {
    todoListApi.createTodoList(title).then(res => {
        dispatch(createTodoListAC(res.data.item))
        dispatch(createTasksAC(res.data.item.id))
    })
}
export const updateTodolistAT = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todoListApi.updateTodolist(todoListId, title).then(res => {
        console.log(res)
        dispatch(changedTodoListTitleAC(todoListId, title))
    })
}

// Types
export type TodolistType = TodoListDomainType & {filter: FilterType}
type MainActionType =
    ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof createTodoListAC>
    | ReturnType<typeof changedTodoListTitleAC>
    | ReturnType<typeof tasksFilterAC>
    | ReturnType<typeof setTodoList>