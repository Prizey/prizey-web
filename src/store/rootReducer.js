import { combineReducers } from 'redux'
import { createReducer } from 'croods'
import { createReducer as createAuthReducer } from 'croods-auth'
import basketReducer from './basket/reducer'

const reducers = {
  auth: createAuthReducer(),
  basket: basketReducer,
  game: createReducer('game'),
  orders: createReducer('orders'),
  products: createReducer('products'),
  tickets: createReducer('tickets'),
  users: createReducer('users'),
}

const rootReducer = combineReducers(reducers)
export default rootReducer
