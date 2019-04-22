import * as Types from './types'

const initialState = {
  product: {
    image: '/mocks/trump-mask.png',
    price: 19.99,
    title: 'Donald Trump Face Mask',
  },
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
