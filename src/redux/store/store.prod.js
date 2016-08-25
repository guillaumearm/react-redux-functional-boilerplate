import { createStore } from 'redux'
import rootReducer from '../reducers'

export const configureStore = (initialState = {}) => {
    const store = createStore(
        rootReducer,
        initialState,
        undefined // middlewares
    )
}
