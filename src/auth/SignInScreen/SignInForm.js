import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { SignIn } from 'seasoned-auth-forms-web'

import SubmitButton from 'design/SubmitButton/SubmitButton'
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
    <SubmitButton {...props} label="LOGIN" />
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
