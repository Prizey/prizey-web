import { chooseProduct, clearProduct } from '../actions'
import * as Types from '../types'

it('test the return o chooseProduct', () => {
  const action = chooseProduct({ id: 1 })

  expect(action).toEqual({
    payload: { id: 1 },
    type: Types.CHOOSE_PRODUCT,
  })
})

it('test the return o clearProduct', () => {
  const action = clearProduct()

  expect(action).toEqual({
    type: Types.CLEAR_PRODUCT,
  })
})
