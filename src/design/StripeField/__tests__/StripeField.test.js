import React from 'react'
import renderer from 'react-test-renderer'

import Field, {
  reducer,
  handleFocus,
  handleBlur,
  handleChange,
} from '../StripeField'

it('renders correctly the desktop field', () => {
  const tree = renderer
    .create(<Field label="field" component={props => <input {...props} />} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('test the reducer hook', () => {
  const initialState = {
    empty: true,
    error: null,
    focused: false,
  }
  let state = {}

  state = reducer(initialState, {})
  expect(state).toEqual(initialState)

  state = reducer(state, { type: 'focus' })
  expect(state.focused).toBeTruthy()

  state = reducer(state, { type: 'blur' })
  expect(state.focused).toBeFalsy()

  state = reducer(state, {
    payload: { empty: false, error: true },
    type: 'change',
  })
  expect(state.empty).toBeFalsy()
  expect(state.error).toBeTruthy()
})

it('handleFocus will set the focus', () => {
  const dispatch = jest.fn()
  const action = { type: 'focus' }

  handleFocus(dispatch)()
  expect(dispatch).toHaveBeenCalledWith(action)
})

it('handleBlur will set the focus', () => {
  const dispatch = jest.fn()
  const action = { type: 'blur' }

  handleBlur(dispatch)()
  expect(dispatch).toHaveBeenCalledWith(action)
})

it('handleChange will set the focus', () => {
  const dispatch = jest.fn()
  const action = {
    payload: { empty: false, error: 'the error' },
    type: 'change',
  }

  handleChange(dispatch)(action.payload)
  expect(dispatch).toHaveBeenCalledWith(action)
})
