import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fulfilled,
  fulfilledInitialized,
  pending,
  pendingInitialized,
  rejectedWithValue
} from 'common/constants/matchers';

const initialState = {
  isAppLoading: false,
  isLoading: false,
  theme: false,
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
      })
  }
});

// export const appReducer =
//   (state: InitialStateType = initialState, action: MainActionsType): InitialStateType => {
//     switch (action.type) {
//       case 'app/SET-APP-LOADING':
//         return { ...state, isAppLoading: action.payload.isAppLoading };
//       case 'app/SET-LOADING':
//         return { ...state, isLoading: action.payload.isLoading };
//       case 'app/SET-ERROR':
//         return { ...state, error: action.payload.error };
//       case 'app/SET-DARK-THEME':
//         return { ...state, theme: action.payload.theme };
//       default:
//         return state;
//     }
//   };
//
// // actions
// export const setAppLoading = (isAppLoading: boolean) => ({
//   type: 'app/SET-APP-LOADING',
//   payload: {
//     isAppLoading
//   }
// } as const);
//
// export const setIsLoadingAC = (isLoading: boolean) => ({
//   type: 'app/SET-LOADING',
//   payload: {
//     isLoading
//   }
// } as const);
//
// export const setErrorAC = (error: null | string) => ({
//   type: 'app/SET-ERROR',
//   payload: {
//     error
//   }
// } as const);
//
// export const setDarkThemeAC = (theme: boolean) => ({
//   type: 'app/SET-DARK-THEME',
//   payload: {
//     theme
//   }
// } as const);
// //thunks

export const appReducer = slice.reducer;
export const appActions = slice.actions;

//types
export type InitialAppStateType = typeof initialState;
// type MainActionsType =
//   | ReturnType<typeof setIsLoadingAC>
//   | ReturnType<typeof setErrorAC>
//   | ReturnType<typeof setDarkThemeAC>
//   | ReturnType<typeof setAppLoading>;