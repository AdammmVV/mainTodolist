import { AppRootStateType } from 'app/store';

const todoListSelector = (state: AppRootStateType) => state.todoLists;

export { todoListSelector };