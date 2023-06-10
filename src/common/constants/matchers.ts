import { isFulfilled, isPending, isRejected, isRejectedWithValue } from '@reduxjs/toolkit';
import { authThunk } from 'features/auth/auth.slice';
import { todoListThunk } from 'features/todolist/todoList.slice';
import { taskThunk } from 'features/todolist/Tasks/tasks.slice';

const pending = isPending(
  authThunk.logIn,
  authThunk.logout,
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
  authThunk.getMe
);



const fulfilled = isFulfilled(
  authThunk.logIn,
  authThunk.logout,
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
  authThunk.getMe
)


const rejectedWithValue = isRejectedWithValue(
  authThunk.logIn,
  authThunk.logout,
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
  authThunk.logIn,
  authThunk.logout,
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