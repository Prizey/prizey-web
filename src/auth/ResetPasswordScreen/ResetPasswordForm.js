import React from 'react'
import { Button } from '@material-ui/core'
import { NewPassword } from 'seasoned-auth-forms-web'

export const FormBottom = ({ classes, ...props }) => (
  <Button {...props} variant="contained" color="primary" fullWidth>
    SET NEW PASSWORD
  </Button>
)

export default props => (
  <NewPassword
    {...props}
    renderButton={buttonProps => <FormBottom {...buttonProps} />}
  />
)
