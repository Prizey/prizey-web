import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { SignUp } from 'seasoned-auth-forms-web'

import SubmitButton from 'design/SubmitButton/SubmitButton'
import SecondaryLink from 'design/SecondaryLink'

const styles = theme => ({
  links: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
  },
  message: {
    marginTop: theme.spacing.xs,
  },
})

export const FormBottom = withStyles(styles)(({ classes, ...props }) => (
  <React.Fragment>
    <SubmitButton {...props} label="REGISTER" />
    <Typography align="center" className={classes.message}>
      By proceeding, you agree you&apos;re 18+ and agree to the terms of
      service.
    </Typography>

    <div className={classes.links}>
      <SecondaryLink to="/sign-in" label="Already have an account?" />
    </div>
  </React.Fragment>
))

export default props => (
  <SignUp
    {...props}
    renderButton={buttonProps => <FormBottom {...buttonProps} />}
  />
)
