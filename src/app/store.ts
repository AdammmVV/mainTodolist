import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todoListReducer} from "features/Todolist/todoListReducer";
import {tasksReducer} from "features/Todolist/Tasks/tasksReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

// hooks
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootStateType, any, AnyAction>>()

// Reducers
const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})

// store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// types
export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store