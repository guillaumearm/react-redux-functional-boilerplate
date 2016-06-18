import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'

const rootReducer = (state, action) => state

export const configureStore = (initialState = {}) => {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(
                createLogger({
                    collapsed: true,
                }),
            ),
            window.devToolsExtension && window.devToolsExtension(),
        )
    )
    return store
}
