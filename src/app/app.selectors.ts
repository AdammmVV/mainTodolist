import { AppRootStateType } from 'app/store';

const isAppLoadingSelector = (state: AppRootStateType) => state.app.isAppLoading;
const isLoadingSelector = (state: AppRootStateType) => state.app.isLoading;
const themeSelector = (state: AppRootStateType) => state.app.theme;
const infoMessageSelector = (state: AppRootStateType) => state.app.infoMessage;
const errorSelector = (state: AppRootStateType) => state.app.error;

export { isAppLoadingSelector, isLoadingSelector, themeSelector, errorSelector, infoMessageSelector };