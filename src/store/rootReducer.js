import { combineReducers } from 'redux'
import { createReducer } from 'croods'
import { createReducer as createAuthReducer } from 'croods-auth'
import orderReducer from './order/reducer'

const reducers = {
  auth: createAuthReducer(),
  game: createReducer('game'),
  order: orderReducer,
  products: createReducer('products'),
  tickets: createReducer('tickets'),
  users: createReducer('users'),
}

const rootReducer = combineReducers(reducers)
export default rootReducer
