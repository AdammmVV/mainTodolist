import { StatusCode, todoListApi, TodoListDomainType, FilterType } from 'api/api';
import { createAsyncThunk, createSlice, isAnyOf, isFulfilled, isPending, PayloadAction } from '@reduxjs/toolkit';
import { tasksAction } from 'features/tasks/tasks.slice';
import { thunkCatch } from 'common/utils/thunk-catch';
import { fulfilledEntityStatus, pendingEntityStatus } from 'features/todolist/constants/matchers';
import { clearAppState } from 'common/actions/cleareAppState.action';

const getTodoList = createAsyncThunk<{ todoLists: TodoListDomainType[] }>(
  'todoList/getTodoList',
  async (data, { rejectWithValue }) => {
    try {
      const res = await todoListApi.getTodoLists();
      return { todoLists: res };
    } catch (e) {
      return rejectWithValue(thunkCatch(e));
    }
  });

const removeTodoList = createAsyncThunk<{ todoListId: string }, { todoListId: string }>(
  'todoList/removeTodoList',
  async (data, { dispatch, rejectWithValue }) => {
    const { todoListId } = data;
    try {
      const res = await todoListApi.removeTodoList(todoListId);
      if (res.resultCode === StatusCode.Ok) {
        dispatch(tasksAction.deleteTodoList({ todoListId }));
      } else {
        return rejectWithValue(res.messages[0]);
      }
      return { todoListId };
    } catch (e) {
      return rejectWithValue(thunkCatch(e));
    }
  });

const createTodoList = createAsyncThunk<{ todoList: TodoListDomainType }, { title: string }>(
  'todoList/createTodoList',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await todoListApi.createTodoList(data.title);
      if (res.resultCode === StatusCode.Ok) {
        dispatch(tasksAction.createTasksState({ todoListId: res.data.item.id }));
      } else {
        return rejectWithValue(res.messages[0]);
      }
      return { todoList: { ...res.data.item, filter: 'all', entityStatus: false } };
    } catch (e) {
      return rejectWithValue(thunkCatch(e));
    }
  });

const updateTodolist = createAsyncThunk<{ todoListId: string, title: string }, { todoListId: string, title: string }>(
  'todoList/updateTodolist',
  async (data, { rejectWithValue }) => {
    const { todoListId, title } = data;
    try {
      const res = await todoListApi.updateTodolist(todoListId, title);
      if (res.resultCode === StatusCode.Ok) {
        return { todoListId, title };
      } else {
        return rejectWithValue(res.messages[0]);
      }
    } catch (e) {
      return rejectWithValue(thunkCatch(e));
    }
  });

const slice = createSlice({
  name: 'todoList',
  initialState: [] as TodoListDomainType[],
  reducers: {
    setTasksFilter: (state, action: PayloadAction<{ todoListId: string, filter: FilterType }>) => {
      const index = state.findIndex(todo => todo.id === action.payload.todoListId);
      if (index !== -1) state[index].filter = action.payload.filter;
    },
    setEntityStatus: ((state, action: PayloadAction<{ todoListId: string, entityStatus: boolean }>) => {
      const index = state.findIndex(todo => todo.id === action.payload.todoListId);
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus;
    })
  },
  extraReducers: builder => {
    builder
      .addCase(clearAppState, () => {
        return []
      })
      .addCase(getTodoList.fulfilled, (state, action) => {
        return action.payload.todoLists.map(todo => ({ ...todo, filter: 'all', entityStatus: false }));
      })
      .addCase(removeTodoList.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.todoListId);
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(createTodoList.fulfilled, (state, action) => {
        state.unshift(action.payload.todoList);
      })
      .addCase(updateTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.todoListId);
        if (index !== -1) state[index] = { ...state[index], title: action.payload.title };
      })
      .addMatcher(isAnyOf(pendingEntityStatus, isPending(removeTodoList, updateTodolist)),
        (state, action) => {
          const index = state.findIndex(todo => todo.id === action.meta.arg.todoListId);
          if (index !== -1) state[index].entityStatus = true;
        })
      .addMatcher(isAnyOf(fulfilledEntityStatus, isFulfilled(removeTodoList, updateTodolist)),
        (state, action) => {
          const index = state.findIndex(todo => todo.id === action.meta.arg.todoListId);
          if (index !== -1) state[index].entityStatus = false;
        });
  }
});

export const todoListReducer = slice.reducer;
export const todoListAction = slice.actions;
export const todoListThunk = {
  getTodoList,
  removeTodoList,
  createTodoList,
  updateTodolist
};

// Types
export type TodolistType = TodoListDomainType & { filter: FilterType, entityStatus: boolean };

