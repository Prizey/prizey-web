import React from 'react'
import { ForgotPassword } from 'seasoned-auth-forms-web'

import SubmitButton from 'design/SubmitButton/SubmitButton'

export default props => (
  <ForgotPassword
    {...props}
    renderButton={buttonProps => (
      <SubmitButton {...buttonProps} label="SEND EMAIL" />
    )}
  />
)
