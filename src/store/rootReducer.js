import { combineReducers } from 'redux'
import { createReducer } from 'croods'
import { createReducer as createAuthReducer } from 'croods-auth'
import { reducer as formReducer } from 'redux-form'

const reducers = {
  auth: createAuthReducer(),
  form: formReducer(),
  game_settings: createReducer('game_settings'),
  products: createReducer('products'),
}

const rootReducer = combineReducers(reducers)
export default rootReducer
