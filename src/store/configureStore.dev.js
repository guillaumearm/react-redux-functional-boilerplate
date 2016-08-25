import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'

import rootReducer from 'reducers'

export default (initialState = {}) => {
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
