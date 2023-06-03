import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from 'redux';
import { todoListReducer } from 'features/todolist/todoListReducer';
import { tasksReducer } from 'features/todolist/Tasks/tasksReducer';
import thunk from 'redux-thunk';
import { authReducer } from 'features/auth/authReducer';
import { appReducer } from 'app/appReducer';

// Reducers
const rootReducer = combineReducers({
  app: appReducer,
  todoLists: todoListReducer,
  tasks: tasksReducer,
  auth: authReducer,
});

// store
export const store = legacy_createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
);

// types
export type AppRootStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store;
