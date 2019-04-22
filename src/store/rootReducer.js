import { combineReducers } from 'redux'
import { createReducer } from 'croods'
import { createReducer as createAuthReducer } from 'croods-auth'
import { reducer as formReducer } from 'redux-form'

const reducers = {
  auth: createAuthReducer(),
  form: formReducer(),
  game: createReducer('game'),
  products: createReducer('products'),
}

const rootReducer = combineReducers(reducers)
export default rootReducer
