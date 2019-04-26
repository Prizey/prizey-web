import React from 'react'
import { Input, FormHelperText } from '@material-ui/core'

export default ({ field, form, type = 'text', label, ...props }) => (
  <React.Fragment>
    <Input
      {...props}
      {...field}
      type={type}
      id={field.name}
      placeholder={
        props.placeholder ? `${props.label} ${props.placeholder}` : props.label
      }
    />
    <FormHelperText id={`${field.name}-text`}>
      {form.touched[field.name] && form.errors[field.name]}
    </FormHelperText>
  </React.Fragment>
)
