import { combineReducers } from 'redux'

const appReducer = (state = {}, action) => state

export default combineReducers({
    app: appReducer,
})
