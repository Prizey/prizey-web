import { combineReducers } from 'redux'
import { createReducer } from 'croods'

const reducers = {
  game_settings: createReducer('game_settings'),
  products: createReducer('products'),
}

const rootReducer = combineReducers(reducers)
export default rootReducer
