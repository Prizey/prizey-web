import * as Types from './types'

const initialState = {
  product: null,
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.CHOOSE_PRODUCT:
      return { ...state, product: action.payload }
    case Types.CLEAR_PRODUCT:
      return { ...state, product: null }
    default:
      return state
  }
}

export default orderReducer
