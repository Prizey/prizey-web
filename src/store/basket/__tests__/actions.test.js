import { chooseProduct, clearProduct, insertCoin } from '../actions'
import * as Types from '../types'

it('test the return of chooseProduct', () => {
  const action = chooseProduct({ id: 1 })

  expect(action).toEqual({
    payload: { id: 1 },
    type: Types.CHOOSE_PRODUCT,
  })
})

it('test the return of clearProduct', () => {
  const action = clearProduct()

  expect(action).toEqual({
    type: Types.CLEAR_PRODUCT,
  })
})

it('test the return of insertCoin', () => {
  const action = insertCoin()

  expect(action).toEqual({
    type: Types.INSERT_COIN,
  })
})
