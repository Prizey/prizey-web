import React, { useReducer } from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core'

import StripeInput from './StripeInput'

export const reducer = (state, action) => {
  switch (action.type) {
    case 'focus':
      return { ...state, focused: true }
    case 'blur':
      return { ...state, focused: false }
    case 'change':
      return { ...state, ...action.payload }
    default:
      return state
  }
}
const initialState = {
  empty: true,
  error: null,
  focused: false,
}

export const handleFocus = dispatch => () => dispatch({ type: 'focus' })
export const handleBlur = dispatch => () => dispatch({ type: 'blur' })
export const handleChange = dispatch => payload =>
  dispatch({ payload, type: 'change' })

export default ({ component, label }) => {
  const [{ focused, empty, error }, dispatch] = useReducer(
    reducer,
    initialState,
  )

  return (
    <FormControl component="fieldset" fullWidth>
      <InputLabel focused={focused} shrink={focused || !empty} error={!!error}>
        {label}
      </InputLabel>
      <Input
        fullWidth
        inputComponent={StripeInput}
        onFocus={handleFocus(dispatch)}
        onBlur={handleBlur(dispatch)}
        onChange={handleChange(dispatch)}
        inputProps={{ component }}
      />

      <FormHelperText>{error && error.message}</FormHelperText>
    </FormControl>
  )
}
