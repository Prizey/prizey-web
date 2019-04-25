import { combineReducers } from 'redux'
import { createReducer } from 'croods'
import { createReducer as createAuthReducer } from 'croods-auth'
import { reducer as formReducer } from 'redux-form'

import orderReducer from './order/reducer'

const reducers = {
  auth: createAuthReducer(),
  form: formReducer,
  game: createReducer('game'),
  order: orderReducer,
  products: createReducer('products'),
  tickets: createReducer('tickets'),
  users: createReducer('users'),
}

const rootReducer = combineReducers(reducers)
export default rootReducer
