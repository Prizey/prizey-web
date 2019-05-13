import * as Types from './types'

const initialState = {
  paid: false,
  product: null,
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.INSERT_COIN:
      return { ...state, paid: true }
    case Types.CHOOSE_PRODUCT:
      return { ...state, product: action.payload }
    case Types.CLEAR_PRODUCT:
      return { ...state, product: null }
    default:
      return state
  }
}

export default orderReducer
