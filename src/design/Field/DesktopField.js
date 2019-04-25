import React from 'react'
import { InputLabel, Input, FormHelperText } from '@material-ui/core'

export default ({
  input,
  meta: { touched, error },
  type = 'text',
  label,
  helperText,
  ...props
}) => (
  <React.Fragment>
    <InputLabel htmlFor={input.name}>{label}</InputLabel>
    <Input {...props} {...input} type={type} id={input.name} />
    <FormHelperText id={`${input.name}-text`}>
      {(touched && error) || helperText}
    </FormHelperText>
  </React.Fragment>
)
