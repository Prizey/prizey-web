import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { SignIn } from 'seasoned-auth-forms-web'

import SecondaryLink from 'design/SecondaryLink'

const styles = theme => ({
  links: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
  },
})

export const FormBottom = withStyles(styles)(({ classes, ...props }) => (
  <React.Fragment>
    <Button {...props} variant="contained" color="primary" fullWidth>
      LOGIN
    </Button>
    <div className={classes.links}>
      <SecondaryLink to="/sign-up" label="Register" />
      <SecondaryLink to="/forgot-password" label="Forgot your password?" />
    </div>
  </React.Fragment>
))

export default props => (
  <SignIn
    {...props}
    renderButton={buttonProps => <FormBottom {...buttonProps} />}
  />
)
