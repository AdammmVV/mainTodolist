import { describe, expect, it } from '@jest/globals';
import { appActions, appReducer, InitialAppStateType } from 'app/app.slice';
import { setInfoMessageAction } from 'common/actions/setInfoMessage.action';
import { clearNotifyState } from 'common/actions/clearNotifyState.action';
import { authThunks } from 'features/auth/auth.slice';

describe('app slice', () => {
  let initialState: InitialAppStateType;

  beforeEach(() => {
    initialState = {
      isAppLoading: false,
      isLoading: false,
      theme: false,
      infoMessage: null,
      error: null
    };
  });

  it('should set isAppLoading to true when app loading action is dispatched', () => {
    const nextState = appReducer(initialState, appActions.setAppLoading({ isAppLoading: true }));
    expect(nextState.isAppLoading).toEqual(true);
  });
  it('should set error state to the provided error message', () => {
    const nextState = appReducer(initialState, appActions.setError({ error: 'Error' }));
    expect(nextState.error).toEqual('Error');
  });
  it('should set isLoading state to true when setIsLoading action is dispatched', () => {
    const nextState = appReducer(initialState, appActions.setIsLoading({ isLoading: true }));
    expect(nextState.isLoading).toEqual(true);
  });
  it('should update theme state to true when setTheme action is dispatched', () => {
    const nextState = appReducer(initialState, appActions.setTheme({ theme: true }));
    expect(nextState.theme).toEqual(true);
  });
  it('should update infoMessage state with the provided message when setInfoMessage action is dispatched', () => {
    const infoMessage = 'Hello Adammm';
    const action = { type: setInfoMessageAction, payload: { infoMessage } };
    const nextState = appReducer(initialState, action);
    expect(nextState.infoMessage).toEqual(infoMessage);
  });
  it('should clear infoMessage and error state when clearNotifyState action is dispatched', () => {
    const initialWithMessageState = {
      isAppLoading: false,
      isLoading: false,
      theme: false,
      infoMessage: 'Hello Adammm',
      error: 'Error'
    };
    const action = { type: clearNotifyState }
    const nextState = appReducer( initialWithMessageState, action)
    expect(nextState.infoMessage).toEqual(null)
    expect(nextState.error).toEqual(null)
  })
  it('should set isAppLoading to true when getMe action is pending', ()=> {
    const action = { type: authThunks.getMe.pending.type }
    const nextState = appReducer(initialState, action)
    expect(nextState.isAppLoading).toEqual(true)
  })
  it('should set isLoading to true when logout action is pending', () => {
    const action = { type: authThunks.logout.pending.type }
    const nextState = appReducer(initialState, action)
    expect(nextState.isLoading).toEqual(true)
  })
  it( 'should set isAppLoading to false when getMe action is fulfilled', () => {
    const initialWithAppLoadingState = {
      isAppLoading: true,
      isLoading: false,
      theme: false,
      infoMessage: null,
      error: null
    };

    const action = { type: authThunks.getMe.fulfilled.type }
    const nextState = appReducer( initialWithAppLoadingState, action)
    expect(nextState.isAppLoading).toEqual(false)
  })
  it('should set isLoading to false when logIn action is fulfilled', () => {
    const initialWithLoadingState = {
      isAppLoading: true,
      isLoading: true,
      theme: false,
      infoMessage: null,
      error: null
    };

    const action = { type: authThunks.logIn.fulfilled.type }
    const nextState = appReducer( initialWithLoadingState, action )
    expect(nextState.isLoading).toEqual(false)
  })
});