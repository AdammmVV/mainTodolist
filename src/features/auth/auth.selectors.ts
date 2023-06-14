import { AppRootStateType } from 'app/store';

const isAuthSelector = (state: AppRootStateType) => state.auth.isAuth

export { isAuthSelector }