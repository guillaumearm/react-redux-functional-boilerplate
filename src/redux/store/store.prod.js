import { createStore } from 'redux'

const rootReducer = (state, action) => state

export const configureStore = (initialState = {}) => {
    const store = createStore(
        rootReducer,
        initialState,
        undefined // middlewares
    )
}
