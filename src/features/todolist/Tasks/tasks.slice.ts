import { StatusCode, TaskDomainType, TaskModuleType, tasksApi } from 'api/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk';
import { thunkCatch } from 'common/utils/thunk-catch';

const getTasks = createAppAsyncThunk<{ todoListId: string, tasks: TaskDomainType[] },
  { todoListId: string }>(
  'tasks/getTasks',
  async (data, { rejectWithValue }) => {
    const { todoListId } = data;
    try {
      const res = await tasksApi.getTasks(todoListId);
      return { todoListId, tasks: res.items };
    } catch (e) {
      return rejectWithValue(thunkCatch(e));
    }
  });

const createTask = createAppAsyncThunk<{ todoListId: string, task: TaskDomainType },
  { todoListId: string, title: string }>(
  'tasks/createTasks',
  async (data, { rejectWithValue }) => {
    const { todoListId, title } = data;
    try {
      const res = await tasksApi.createTask(todoListId, title);
      if (res.resultCode === StatusCode.Ok) {
        return { todoListId, task: res.data.item };
      } else {
        debugger
        return rejectWithValue(res.messages[0]);
      }
    } catch (e) {
      return rejectWithValue(thunkCatch(e));
    }
  });

const removeTask = createAppAsyncThunk<{ todoListId: string, taskId: string },
  { todoListId: string, taskId: string }>(
  'tasks/removeTask',
  async (data, { rejectWithValue }) => {
    const { todoListId, taskId } = data;
    try {
      const res = await tasksApi.removeTask(todoListId, taskId);
      if (res.resultCode === StatusCode.Ok) {
        return { todoListId, taskId };
      } else {
        return rejectWithValue(res.messages[0]);
      }
    } catch (e) {
      return rejectWithValue(thunkCatch(e));
    }
  });

const updateTask = createAppAsyncThunk<{ todoListId: string, taskId: string, updatedTask: TaskDomainType },
  { todoListId: string, taskId: string, domainModel: TaskModuleType }>(
  'tasks/updateTask',
  async (data, { rejectWithValue, getState }) => {
    const { todoListId, taskId, domainModel } = data;
    const task = getState().tasks[todoListId].find(task => task.id === taskId);
    if (!task) {
      return rejectWithValue('task not find');
    }
    const taskModel: TaskModuleType = {
      title: task.title,
      completed: task.completed,
      description: task.description,
      deadline: task.deadline,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      ...domainModel
    };
    try {
      const res = await tasksApi.updateTask(todoListId, taskId, taskModel);
      if (res.resultCode === StatusCode.Ok) {
        return { todoListId, taskId, updatedTask: res.data.item };
      } else {
        return rejectWithValue(res.messages[0]);
      }
    } catch (e) {
      return rejectWithValue(thunkCatch(e));
    }
  });

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {
    clearTasksState: (state, action: PayloadAction<{ todoListId: string }>) => {
      delete state[action.payload.todoListId];
    },
    createTasksState: (state, action: PayloadAction<{ todoListId: string }>) => {
      state[action.payload.todoListId] = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state[action.payload.todoListId] = action.payload.tasks;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state[action.payload.todoListId].unshift(action.payload.task);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
        if (index !== -1) state[action.payload.todoListId].splice(index, 1);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
        if (index !== -1) state[action.payload.todoListId][index] = action.payload.updatedTask;
      });
  }
});

export const tasksReducer = slice.reducer;
export const tasksAction = slice.actions;
export const taskThunk = {
  getTasks,
  createTask,
  removeTask,
  updateTask
};

// Types
export type TasksStateType = {
  [key: string]: TaskDomainType[];
};
