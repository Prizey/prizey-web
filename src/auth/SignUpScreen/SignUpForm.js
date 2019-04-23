import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { SignUp } from 'seasoned-auth-forms-web'

import SubmitButton from 'design/SubmitButton/SubmitButton'
import SecondaryLink from 'design/SecondaryLink'

const styles = theme => ({
  links: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
  },
})

export const FormBottom = withStyles(styles)(({ classes, ...props }) => (
  <React.Fragment>
    <SubmitButton {...props} label="REGISTER" />
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
