import * as Types from './types'

export const chooseProduct = product => ({
  payload: product,
  type: Types.CHOOSE_PRODUCT,
})

export const clearProduct = () => ({
  type: Types.CLEAR_PRODUCT,
})
