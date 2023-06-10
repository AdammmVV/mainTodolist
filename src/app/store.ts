import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from 'app/app.slice';
import { authReducer } from 'features/auth/auth.slice';
import { tasksReducer } from 'features/todolist/Tasks/tasks.slice';
import { todoListReducer } from 'features/todolist/todoList.slice';


// store
export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    todoLists: todoListReducer,
    tasks: tasksReducer,
  }
})


// types
export type AppDispatch = typeof store.dispatch
export type AppRootStateType = ReturnType<typeof store.getState>;

//@ts-ignore
window.store = store;
