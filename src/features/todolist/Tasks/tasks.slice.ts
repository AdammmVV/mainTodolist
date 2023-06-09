import { TaskDomainType, TaskModuleType, tasksApi } from 'api/api';
import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk';


const getTasks = createAppAsyncThunk<{ todolistId: string, tasks: TaskDomainType[] }, string>(
  'tasks/getTasks',
  async (data, thunkApi) => {
    const res = await tasksApi.getTasks(data);
    return { todolistId: data, tasks: res.items };
  }
);

const createTask = createAppAsyncThunk<{ todolistId: string, task: TaskDomainType }, { todoListId: string, title: string }>(
  'tasks/createTasks',
  async (data, thunkApi) => {
    const res = await tasksApi.createTask(data.todoListId, data.title);
    return { todolistId: data.todoListId, task: res.data.item };
  }
);

const removeTask = createAppAsyncThunk<{ todoListId: string, taskId: string }, { todoListId: string, taskId: string }>(
  'tasks/removeTask',
  async (data, thunkApi) => {
    const res = await tasksApi.removeTask(data.todoListId, data.taskId);
    return { todoListId: data.todoListId, taskId: data.taskId};
  }
);

const updateTask = createAppAsyncThunk<
  { todoListId: string, taskId: string, updatedTask: TaskDomainType },
  { todoListId: string, taskId: string, domainModel: TaskModuleType }>(
  'tasks/updateTask',
  async (data, thunkApi) => {
    const task = thunkApi.getState().tasks[data.todoListId].find(task => task.id === data.taskId)
    if (!task) {
      return thunkApi.rejectWithValue('task not find')
    }
    const taskModel: TaskModuleType = {
      title: task.title,
      completed: task.completed,
      description: task.description,
      deadline: task.deadline,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      ...data.domainModel
    }
    const res = await tasksApi.updateTask(data.todoListId, data.taskId, taskModel)
    return { todoListId: data.todoListId, taskId: data.taskId, updatedTask: res.data.item }
  }
)

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state[action.payload.todolistId].unshift(action.payload.task);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId)
        if (index !== -1) state[action.payload.todoListId].slice(index, 1)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId)
        if (index !== -1) state[action.payload.todoListId][index] = action.payload.updatedTask
      });
  }
});
// // Reducer
// export const tasksReducer = (
//   state: TasksStateType = {},
//   action: MainActionType
// ): TasksStateType => {
//   switch (action.type) {
//     case 'SET-TASKS':
//       return { ...state, [action.payload.todoListId]: action.payload.tasks };
//     case 'CREATE-TASK':
//       const todoListId = action.payload.taskModel.todoListId;
//       return {
//         ...state,
//         [todoListId]: [action.payload.taskModel, ...state[todoListId]]
//       };
//     case 'REMOVE-TASK':
//       return {
//         ...state,
//         [action.payload.todoListId]: state[action.payload.todoListId].filter(
//           (f) => f.id !== action.payload.taskId
//         )
//       };
//     case 'UPDATE-TASK':
//       return {
//         ...state,
//         [action.payload.todoListId]: state[action.payload.todoListId].map((t) =>
//           t.id === action.payload.taskId
//             ? { ...t, ...action.payload.domainModel }
//             : t
//         )
//       };
//     case 'CREATE-TASKS':
//       return { ...state, [action.payload.keyTasks]: [] };
//     case 'REMOVE-TASKS':
//       delete state[action.payload.keyTasks];
//       return state;
//     default:
//       return state;
//   }
// };
//
// // Actions creator
// export const setTasks = (todoListId: string, tasks: TaskDomainType[]) =>
//   ({ type: 'SET-TASKS', payload: { tasks, todoListId } } as const);
// export const createTaskAC = (taskModel: TaskDomainType) =>
//   ({ type: 'CREATE-TASK', payload: { taskModel } } as const);
// export const removeTaskAC = (todoListId: string, taskId: string) =>
//   ({
//     type: 'REMOVE-TASK',
//     payload: {
//       todoListId,
//       taskId
//     }
//   } as const);
// export const createTasksAC = (keyTasks: string) =>
//   ({ type: 'CREATE-TASKS', payload: { keyTasks } } as const);
// export const removeTasksAC = (keyTasks: string) =>
//   ({ type: 'REMOVE-TASKS', payload: { keyTasks } } as const);
// export const updateTaskAC = (
//   todoListId: string,
//   taskId: string,
//   domainModel: TaskModuleType
// ) =>
//   ({
//     type: 'UPDATE-TASK',
//     payload: { domainModel, todoListId, taskId }
//   } as const);
//
// // Thunk creator
// export const getTasksAT = (todoListId: string) => (dispatch: Dispatch) => {
//   tasksApi.getTasks(todoListId).then((res) => {
//     if (!res.error) {
//       dispatch(setTasks(todoListId, res.items));
//     } else {
//       alert(res.error);
//     }
//   });
// };
// export const createTaskAT =
//   (todoListId: string, title: string) => (dispatch: Dispatch) => {
//     dispatch(changeEntityStatusAC(todoListId, true));
//     tasksApi.createTask(todoListId, title).then((res) => {
//       if (res.resultCode === statusCode.Ok) {
//         dispatch(createTaskAC(res.data.item));
//       } else {
//         alert(res.messages);
//       }
//     })
//       .finally(() => {
//         dispatch(changeEntityStatusAC(todoListId, false));
//       });
//   };
// export const removeTaskAT =
//   (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
//     dispatch(changeEntityStatusAC(todoListId, true));
//     tasksApi.removeTask(todoListId, taskId).then((res) => {
//       if (res.resultCode === statusCode.Ok) {
//         dispatch(removeTaskAC(todoListId, taskId));
//       } else {
//         alert(res.messages);
//       }
//     })
//       .finally(() => {
//         dispatch(changeEntityStatusAC(todoListId, false));
//       });
//   };
// export const updateTaskAT =
//   (todoListId: string, taskId: string, domainModel: TaskModuleType) =>
//     (dispatch: Dispatch, getState: () => AppRootStateType) => {
//       dispatch(changeEntityStatusAC(todoListId, true));
//       const task = getState().tasks[todoListId].find((t) => t.id === taskId);
//       if (!task) {
//         console.warn('task not find');
//         return;
//       }
//       const taskModel: TaskModuleType = {
//         title: task.title,
//         completed: task.completed,
//         description: task.description,
//         deadline: task.deadline,
//         status: task.status,
//         priority: task.priority,
//         startDate: task.startDate,
//         ...domainModel
//       };
//       tasksApi.updateTask(todoListId, taskId, taskModel).then((res) => {
//         if (res.resultCode === statusCode.Ok) {
//           dispatch(updateTaskAC(todoListId, taskId, taskModel));
//         } else {
//           alert(res.messages);
//         }
//       })
//         .finally(() => dispatch(dispatch(changeEntityStatusAC(todoListId, false))));
//     };

export const tasksReducer = slice.reducer
export const taskThunk = {
  getTasks,
  createTask,
  removeTask,
  updateTask
}

// Types
export type TasksStateType = {
  [key: string]: TaskDomainType[];
};
// type MainActionType =
//   | ReturnType<typeof setTasks>
//   | ReturnType<typeof createTaskAC>
//   | ReturnType<typeof removeTaskAC>
//   | ReturnType<typeof createTasksAC>
//   | ReturnType<typeof removeTasksAC>
//   | ReturnType<typeof updateTaskAC>;
