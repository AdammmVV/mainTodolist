import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fulfilled,
  fulfilledInitialized,
  pending,
  pendingInitialized,
  rejectedWithValue
} from 'common/constants/matchers';
import { setInfoMessageAction } from 'common/actions/setInfoMessage.action';
import { clearNotifyState } from 'common/actions/clearNotifyState.action';
import { authThunks } from 'features/auth/auth.slice';

const initialState = {
  isAppLoading: false,
  isLoading: false,
  theme: false,
  infoMessage: null as null | string,
  error: null as null | string
};

const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppLoading: (state, action: PayloadAction<{ isAppLoading: boolean }>) => {
      state.isAppLoading = action.payload.isAppLoading;
    },
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    setError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error;
    },
    setTheme: (state, action: PayloadAction<{ theme: boolean }>) => {
      state.theme = action.payload.theme;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(setInfoMessageAction, (state, action) => {
        state.infoMessage = action.payload.infoMessage;
      })
      .addCase(clearNotifyState, state => {
        state.error = null
        state.infoMessage = null
      })
      .addCase(authThunks.getMe.rejected, state => {
        state.isAppLoading = false
      })
      .addMatcher(pendingInitialized, state => {
        state.isAppLoading = true;
      })
      .addMatcher(pending, state => {
        state.isLoading = true;
      })
      .addMatcher(fulfilledInitialized, state => {
        state.isAppLoading = false;
      })
      .addMatcher(fulfilled, state => {
        state.isLoading = false;
      })
      .addMatcher(rejectedWithValue, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

//types
export type InitialAppStateType = typeof initialState;