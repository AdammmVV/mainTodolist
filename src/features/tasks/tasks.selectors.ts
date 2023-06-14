import { AppRootStateType } from 'app/store';

const tasksSelector = (state: AppRootStateType) => state.tasks

export { tasksSelector }