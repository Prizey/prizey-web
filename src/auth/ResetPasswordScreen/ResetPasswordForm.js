import React from 'react'
import { NewPassword } from 'seasoned-auth-forms-web'

import SubmitButton from 'design/SubmitButton/SubmitButton'

export default props => (
  <NewPassword
    {...props}
    renderButton={buttonProps => (
      <SubmitButton {...buttonProps} label="SET NEW PASSWORD" />
    )}
  />
)
