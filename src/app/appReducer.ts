

const initialState = {

}

export const AppReducer = (state: InitialStateType = initialState, action: MainActionsType) => {
    switch (action.type) {
        default:
            return state
    }
}

// actions


//thunks

//types
type InitialStateType = typeof initialState
type MainActionsType = any