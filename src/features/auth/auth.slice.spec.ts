import { describe, expect, it } from '@jest/globals'
import { authReducer, InitialAuthStateType, setIsAuth } from 'features/auth/auth.slice';

describe('auth slice', () => {
  let initialState: InitialAuthStateType

  beforeEach(() => {
    initialState = {
      isAuth: false
    }
  })

  it('should handle setIsAuth action', () => {
    const nextState = authReducer(initialState, setIsAuth({ isAuth: true }))

    expect(nextState.isAuth).toEqual(true)
  })

})
