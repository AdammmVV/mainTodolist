import {FilterType} from "../App";

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

type MainActionType = RemoveTodoListAT | AddNewTodoListAT | ChangedTodoListTitleAT | TasksFilterAT

export const todoListReducer = (state: TodolistType[], action: MainActionType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODO-LIST":
            return state.filter(f => f.id !== action.payload.todoListId)
        case "ADD-NEW-TODO-LIST":
            let newTitle: TodolistType = {id: action.payload.todoListId, title: action.payload.newTitle, filter: "all"}
            return [newTitle, ...state]
        case "CHANGED-TODO-LIST-TITLE":
            return state.map(t => t.id === action.payload.todoListId ? {...t, title: action.payload.newTitle} : t)
        case "TASKS-FILTER":
            return state.map(t => t.id === action.payload.todoListId ? {...t, filter: action.payload.filter} : t)
        default:
            return state
    }
}

type RemoveTodoListAT = {
    type: 'REMOVE-TODO-LIST'
    payload: {
        todoListId: string
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListAT => {
    return {
        type: 'REMOVE-TODO-LIST',
        payload: {
            todoListId
        }
    }
}

type AddNewTodoListAT = {
    type: 'ADD-NEW-TODO-LIST'
    payload: {
        todoListId: string
        newTitle: string
    }
}

export const addNewTodoListAC = (todoListId: string, newTitle: string): AddNewTodoListAT => {
    return {
        type: 'ADD-NEW-TODO-LIST',
        payload: {
            todoListId,
            newTitle
        }
    }
}

type ChangedTodoListTitleAT = {
    type: 'CHANGED-TODO-LIST-TITLE'
    payload: {
        todoListId: string
        newTitle: string
    }
}

export const changedTodoListTitleAC = (todoListId: string, newTitle: string): ChangedTodoListTitleAT => {
    return {
        type: 'CHANGED-TODO-LIST-TITLE',
        payload: {
            todoListId,
            newTitle,
        }
    }
}

type TasksFilterAT = {
    type: 'TASKS-FILTER',
    payload: {
        todoListId: string
        filter: FilterType
    }
}

export const tasksFilterAC = (todoListId: string, filter: FilterType): TasksFilterAT => {
  return {
      type: 'TASKS-FILTER',
      payload: {
          todoListId,
          filter
      }
  }
}
