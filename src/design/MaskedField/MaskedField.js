import React from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core'

import MaskedInput from './MaskedInput'

const MaskedInputField = ({ field, form, ...props }) => (
  <FormControl
    component="fieldset"
    error={form.touched[field.name] && !!form.errors[field.name]}
    id={`${field.name}-fieldset`}
    fullWidth
  >
    <InputLabel htmlFor={field.name}>{props.label}</InputLabel>
    <Input
      {...props}
      {...field}
      type={props.type}
      id={field.name}
      inputProps={{ mask: props.mask }}
      inputComponent={MaskedInput}
    />
    <FormHelperText id={`${field.name}-text`}>
      {form.touched[field.name] && form.errors[field.name]}
    </FormHelperText>
  </FormControl>
)

export default MaskedInputField
