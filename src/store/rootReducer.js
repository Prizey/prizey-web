import { combineReducers } from 'redux'

const reducers = {
  dumb: (state = {}) => state,
}

const rootReducer = combineReducers(reducers)
export default rootReducer
