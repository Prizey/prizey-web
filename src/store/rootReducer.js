import { combineReducers } from 'redux'
import { createReducer } from 'croods'

const reducers = {
  products: createReducer('products'),
}

const rootReducer = combineReducers(reducers)
export default rootReducer
