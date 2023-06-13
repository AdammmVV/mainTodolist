import { isFulfilled, isPending, isRejected, isRejectedWithValue } from '@reduxjs/toolkit';
import { authThunks } from 'features/auth/auth.slice';
import { todoListThunk } from 'features/todolist/todoList.slice';
import { taskThunk } from 'features/tasks/tasks.slice';

const pending = isPending(
  authThunks.logIn,
  authThunks.logout,
  todoListThunk.createTodoList,
  todoListThunk.removeTodoList,
  todoListThunk.getTodoList,
  todoListThunk.updateTodolist,
  taskThunk.getTasks,
  taskThunk.removeTask,
  taskThunk.createTask,
  taskThunk.updateTask
);

const pendingInitialized = isPending(
  authThunks.getMe
);



const fulfilled = isFulfilled(
  authThunks.logIn,
  authThunks.logout,
  todoListThunk.createTodoList,
  todoListThunk.removeTodoList,
  todoListThunk.getTodoList,
  todoListThunk.updateTodolist,
  taskThunk.getTasks,
  taskThunk.removeTask,
  taskThunk.createTask,
  taskThunk.updateTask
);


const fulfilledInitialized = isFulfilled(
  authThunks.getMe
)


const rejectedWithValue = isRejectedWithValue(
  authThunks.logIn,
  authThunks.logout,
  todoListThunk.createTodoList,
  todoListThunk.removeTodoList,
  todoListThunk.getTodoList,
  todoListThunk.updateTodolist,
  taskThunk.getTasks,
  taskThunk.removeTask,
  taskThunk.createTask,
  taskThunk.updateTask
);

const rejected = isRejected(
  authThunks.logIn,
  authThunks.logout,
  todoListThunk.createTodoList,
  todoListThunk.removeTodoList,
  todoListThunk.getTodoList,
  todoListThunk.updateTodolist,
  taskThunk.getTasks,
  taskThunk.removeTask,
  taskThunk.createTask,
  taskThunk.updateTask
);

export {
  pending,
  pendingInitialized,
  fulfilled,
  fulfilledInitialized,
  rejected,
  rejectedWithValue
};