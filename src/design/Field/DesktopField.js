import React from 'react'
import { InputLabel, Input, FormHelperText } from '@material-ui/core'

export default ({ field, form, type = 'text', label, ...props }) => (
  <React.Fragment>
    <InputLabel htmlFor={field.name}>{label}</InputLabel>
    <Input {...props} {...field} type={type} id={field.name} />
    <FormHelperText id={`${field.name}-text`}>
      {form.touched[field.name] && form.errors[field.name]}
    </FormHelperText>
  </React.Fragment>
)
