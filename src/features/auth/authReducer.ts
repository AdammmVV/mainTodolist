import { authApi, DataRequestLoginType } from 'api/api';
import { Dispatch } from 'redux';
import { setIsLoadingAC } from 'app/appReducer';

const initialState = {
  isAuth: false
};

export const authReducer =
  (state: InitialStateType = initialState, action: MainActionType): InitialStateType => {
    switch (action.type) {
      case 'auth/GET-ME':
        return { ...state, isAuth: action.payload.initialized };
      default:
        return state;
    }
  };

// Action creator
export const isIsInitializedAC = (initialized: boolean) =>
  ({
    type: 'auth/GET-ME',
    payload: {
      initialized
    }
  } as const);


// Thunk creator
export const getMeTC = () => (dispatch: Dispatch) => {
  authApi.getMe()
    .then((res) => {
      dispatch(setIsLoadingAC(false));
      if (res.resultCode === 0)
        dispatch(isIsInitializedAC(true));
    })
    .finally(() => {
      dispatch(setIsLoadingAC(false));
    });
};

export const logInTC = (data: DataRequestLoginType) => (dispatch: Dispatch) => {
  dispatch(setIsLoadingAC(true));
  authApi.logIn(data)
    .then((res) => {
      dispatch(isIsInitializedAC(true));
      if (res.resultCode === 0) {

      }
    })
    .finally(() => {
      dispatch(setIsLoadingAC(false));
    });
};

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setIsLoadingAC(true));
  authApi.logout()
    .then((res) => {
      if (res.resultCode === 0) {
        dispatch(isIsInitializedAC(false));
      }
    })
    .finally(() => {
    dispatch(setIsLoadingAC(false));
  });
};

// Types
type InitialStateType = typeof initialState
type MainActionType = ReturnType<typeof isIsInitializedAC>
