import reducer from '../reducer'
import * as Types from '../types'

const initialState = {
  product: null,
}

it('verify the reducer result on empty action', () => {
  const state = reducer(undefined, {})
  expect(state).toEqual(initialState)
})

it('verify the reducer result on chooseProduct action', () => {
  const action = { payload: { id: 1 }, type: Types.CHOOSE_PRODUCT }
  const state = reducer(undefined, action)
  expect(state).toEqual({
    product: action.payload,
  })
})

it('verify the reducer result on clearProduct action', () => {
  const action = { type: Types.CLEAR_PRODUCT }
  const state = reducer({ product: { id: 1 } }, action)
  expect(state).toEqual({
    product: null,
  })
})
