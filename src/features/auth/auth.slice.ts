import { authApi, DataRequestLoginType, StatusCode } from 'api/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk';
import { thunkCatch } from 'common/utils/thunk-catch';
import { setInfoMessageAction } from 'common/actions/setInfoMessage.action';
import { clearAppState } from 'common/actions/clearAppState.action';

const initialState = {
  isAuth: false
};

const getMe = createAppAsyncThunk<void>(
  'auth/getMe',
  async (data, { dispatch, rejectWithValue }) => {
    const res = await authApi.getMe();
    if (res.resultCode === StatusCode.Ok) {
      dispatch(setIsAuth({ isAuth: true }));
      dispatch(setInfoMessageAction({ infoMessage: `Hello ${res.data.login}` }));
    } else {
      dispatch(setIsAuth({ isAuth: false }));
      return rejectWithValue(res.messages[0])
    }
  }
);

const logIn = createAppAsyncThunk<void, DataRequestLoginType>(
  'auth/logIn',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await authApi.logIn(data);
      if (res.resultCode === StatusCode.Ok) {
        dispatch(getMe());
      } else {
        return rejectWithValue(res.messages[0]);
      }
    } catch (e) {
      return rejectWithValue(thunkCatch(e));
    }
  });

const logout = createAppAsyncThunk<void>(
  'auth/logout',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await authApi.logout();
      if (res.resultCode === StatusCode.Ok) {
        dispatch(getMe());
        dispatch(clearAppState());
      } else {
        return rejectWithValue(res.messages[0]);
      }
    } catch (e) {
      return rejectWithValue(thunkCatch(e));
    }
  });

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<{ isAuth: boolean }>) => {
      state.isAuth = action.payload.isAuth;
    }
  }
});

export const authReducer = slice.reducer;
export const { setIsAuth } = slice.actions;
export const authThunks = {
  getMe,
  logIn,
  logout
};

// Types
export type InitialAuthStateType = typeof initialState
