import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { SignUp } from 'seasoned-auth-forms-web'

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
    <Button {...props} variant="contained" color="primary" fullWidth>
      REGISTER
    </Button>
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
