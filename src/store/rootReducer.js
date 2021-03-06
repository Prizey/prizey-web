import { combineReducers } from 'redux'
import { createReducer } from 'croods'
import { createReducer as createAuthReducer } from 'croods-auth'
import basketReducer from './basket/reducer'

const reducers = {
  adminText: createReducer('adminText'),
  auth: createAuthReducer(),
  basket: basketReducer,
  cards: createReducer('cards'),
  freegameIps: createReducer('freegameIps'),
  game: createReducer('game'),
  orders: createReducer('orders'),
  payments: createReducer('payments'),
  products: createReducer('products'),
  purchaseOptions: createReducer('purchaseOptions'),
  tickets: createReducer('tickets'),
  users: createReducer('users'),
}

const rootReducer = combineReducers(reducers)
export default rootReducer
