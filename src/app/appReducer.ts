const initialState = {
  isAppLoading: false,
  isLoading: false,
  theme: false,
  error: null as null | string
};

export const appReducer =
  (state: InitialStateType = initialState, action: MainActionsType): InitialStateType => {
  switch (action.type) {
    case 'app/SET-APP-LOADING':
      return {...state, isAppLoading: action.payload.isAppLoading}
    case 'app/SET-LOADING':
      return { ...state, isLoading: action.payload.isLoading };
    case 'app/SET-ERROR':
      return {...state, error: action.payload.error}
    case 'app/SET-DARK-THEME':
      return {...state, theme: action.payload.theme}
    default:
      return state;
  }
};

// actions
export const setAppLoading = (isAppLoading: boolean) => ({
  type: 'app/SET-APP-LOADING',
  payload: {
    isAppLoading
  }
} as const)

export const setIsLoadingAC = (isLoading: boolean) => ({
  type: 'app/SET-LOADING',
  payload: {
    isLoading
  }
} as const);

export const setErrorAC = (error: null | string) => ({
  type: 'app/SET-ERROR',
  payload: {
    error
  }
} as const)

export const setDarkThemeAC = (theme: boolean) => ({
  type: 'app/SET-DARK-THEME',
  payload: {
    theme
  }
} as const)
//thunks

//types
type InitialStateType = typeof initialState;
type MainActionsType =
  | ReturnType<typeof setIsLoadingAC>
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setDarkThemeAC>
  | ReturnType<typeof setAppLoading>;