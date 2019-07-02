import { combineReducers } from 'redux'
import { createReducer } from 'croods'
import { createReducer as createAuthReducer } from 'croods-auth'
import basketReducer from './basket/reducer'

const reducers = {
  auth: createAuthReducer(),
  basket: basketReducer,
  cards: createReducer('cards'),
  game: createReducer('game'),
  adminText: createReducer('adminText'),
  orders: createReducer('orders'),
  payments: createReducer('payments'),
  products: createReducer('products'),
  purchaseOptions: createReducer('purchaseOptions'),
  tickets: createReducer('tickets'),
  users: createReducer('users'),
}

const rootReducer = combineReducers(reducers)
export default rootReducer
