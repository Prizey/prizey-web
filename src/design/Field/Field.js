import React from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { FormControl } from '@material-ui/core'

import MobileField from './MobileField'
import DesktopField from './DesktopField'

export const InputField = ({ width, field, form, ...props }) => {
  const UseField = isWidthUp('sm', width) ? DesktopField : MobileField
  return (
    <FormControl
      component="fieldset"
      error={form.touched[field.name] && !!form.errors[field.name]}
      id={`${field.name}-fieldset`}
      fullWidth
    >
      <UseField {...props} field={field} form={form} />
    </FormControl>
  )
}

export default withWidth()(InputField)
