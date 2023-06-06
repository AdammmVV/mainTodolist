import { FilterType } from 'app/App';
import { Dispatch } from 'redux';
import { todoListApi, TodoListDomainType } from 'api/api';
import { createTasksAC } from 'features/todolist/Tasks/tasksReducer';
import { setIsLoadingAC } from 'app/appReducer';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

// Reducer
export const todoListReducer = (state: TodolistType[] = [], action: MainActionType): TodolistType[] => {
  switch (action.type) {
    case 'SET-TODOLIST':
      return action.payload.todoLists.map((tl) => ({ ...tl, filter: 'all', entityStatus: false }));
    case 'REMOVE-TODO-LIST':
      return state.filter((f) => f.id !== action.payload.todoListId);
    case 'CREATE-TODOLIST':
      return [{ ...action.payload.todoList, filter: 'all', entityStatus: false }, ...state];
    case 'CHANGED-TODO-LIST-TITLE':
      return state.map((tl) => tl.id === action.payload.todoListId
        ? { ...tl, title: action.payload.newTitle }
        : tl);
    case 'TASKS-FILTER':
      return state.map((tl) =>
        tl.id === action.payload.todoListId
          ? { ...tl, filter: action.payload.filter }
          : tl
      );
    case 'todolist/CHANGE-ENTITY-STATUS':
      return state.map(tl => tl.id === action.payload.todoListId
        ? { ...tl, entityStatus: action.payload.status }
        : tl);
    default:
      return state;
  }
};

// Action creator
export const setTodoList = (todoLists: TodoListDomainType[]) =>
  ({
    type: 'SET-TODOLIST',
    payload: {
      todoLists
    }
  } as const);
export const removeTodoListAC = (todoListId: string) =>
  ({
    type: 'REMOVE-TODO-LIST',
    payload: {
      todoListId
    }
  } as const);
export const createTodoListAC = (todoList: TodoListDomainType) =>
  ({
    type: 'CREATE-TODOLIST',
    payload: {
      todoList
    }
  } as const);
export const changedTodoListTitleAC = (todoListId: string, newTitle: string) =>
  ({
    type: 'CHANGED-TODO-LIST-TITLE',
    payload: {
      todoListId,
      newTitle
    }
  } as const);
export const tasksFilterAC = (todoListId: string, filter: FilterType) =>
  ({
    type: 'TASKS-FILTER',
    payload: {
      todoListId,
      filter
    }
  } as const);
export const changeEntityStatusAC = (todoListId: string, status: boolean) =>
  ({
    type: 'todolist/CHANGE-ENTITY-STATUS',
    payload: { todoListId, status }
  } as const);

// Thunk creator
export const getTodoListAT = () => (dispatch: Dispatch) => {
  dispatch(setIsLoadingAC(true));
  todoListApi.getTodoLists()
    .then((res) => {
      dispatch(setTodoList(res));
    })
    .finally(() => {
      dispatch(setIsLoadingAC(false));
    });
};
export const removeTodoListAT =
  (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(changeEntityStatusAC(todoListId, true))
    dispatch(setIsLoadingAC(true));
    todoListApi.removeTodoList(todoListId)
      .then(() => {
        dispatch(removeTodoListAC(todoListId));
      })
      .finally(() => {
        dispatch(changeEntityStatusAC(todoListId, false))
        dispatch(setIsLoadingAC(false));
      });
  };
export const createTodoListAT = (title: string) => (dispatch: Dispatch) => {
  dispatch(setIsLoadingAC(true));
  todoListApi.createTodoList(title).then((res) => {
    if (res.resultCode === 0) {
      dispatch(createTodoListAC(res.data.item));
      dispatch(createTasksAC(res.data.item.id));
    }
  }).catch((e)=> {
    if (e instanceof AxiosError) {
      debugger
      toast(e.message)
    } else {
      toast('some Error')
    }
  })
    .finally(() => {
    dispatch(setIsLoadingAC(false));
  });
};
export const updateTodolistAT =
  (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(changeEntityStatusAC(todoListId, true));
    dispatch(setIsLoadingAC(true));
    todoListApi.updateTodolist(todoListId, title)
      .then((res) => {
        if (res.resultCode === 0) {
          dispatch(changedTodoListTitleAC(todoListId, title));
        } else {

        }
      })
      .finally(() => {
        dispatch(changeEntityStatusAC(todoListId, false));
        dispatch(setIsLoadingAC(false));
      });
  };

// Types
export type TodolistType = TodoListDomainType & { filter: FilterType, entityStatus: boolean };
type MainActionType =
  | ReturnType<typeof removeTodoListAC>
  | ReturnType<typeof createTodoListAC>
  | ReturnType<typeof changedTodoListTitleAC>
  | ReturnType<typeof tasksFilterAC>
  | ReturnType<typeof setTodoList>
  | ReturnType<typeof changeEntityStatusAC>;
