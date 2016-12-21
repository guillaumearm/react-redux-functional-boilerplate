import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import { identity } from 'ramda';

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
            window.devToolsExtension && window.devToolsExtension() || identity,
        )
    )
    return store
}
