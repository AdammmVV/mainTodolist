import { authApi, DataRequestLoginType } from 'api/api';
import { Dispatch } from 'redux';
import { setAppLoading } from 'app/appReducer';

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
  dispatch(setAppLoading(true));
  authApi.getMe()
    .then((res) => {
      if (res.resultCode === 0)
        dispatch(isIsInitializedAC(true));
    })
    .finally(() => {
      dispatch(setAppLoading(false));
    });
};

export const logInTC = (data: DataRequestLoginType) => (dispatch: Dispatch) => {
  dispatch(setAppLoading(true));
  authApi.logIn(data)
    .then((res) => {
      if (res.resultCode === 0) {
        dispatch(isIsInitializedAC(true));
      }
    })
    .finally(() => {
      dispatch(setAppLoading(false))
    });
};

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppLoading(true))
  authApi.logout()
    .then((res) => {
      if (res.resultCode === 0) {
        dispatch(isIsInitializedAC(false));
      }
    })
    .finally(() => {
      dispatch(setAppLoading(false))
  });
};

// Types
type InitialStateType = typeof initialState
type MainActionType = ReturnType<typeof isIsInitializedAC>
