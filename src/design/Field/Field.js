import React from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { FormControl } from '@material-ui/core'

import MobileField from './MobileField'
import DesktopField from './DesktopField'

export const InputField = ({ width, input, meta, ...props }) => {
  const { touched, error } = meta
  const UseField = isWidthUp('sm', width) ? DesktopField : MobileField

  return (
    <FormControl
      component="fieldset"
      error={touched && !!error}
      id={`${input.name}-fieldset`}
      fullWidth
    >
      <UseField {...props} input={input} meta={meta} />
    </FormControl>
  )
}

export default withWidth()(InputField)
