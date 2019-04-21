import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import { Link } from '@reach/router'
import { SignIn } from 'seasoned-auth-forms-web'

const styles = theme => ({
  link: {
    textDecoration: 'none',
  },
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
      <Link to="/sign-up" className={classes.link}>
        <Typography color="primary" variant="caption">
          Register
        </Typography>
      </Link>
      <Link to="/forgot-password" className={classes.link}>
        <Typography color="primary" variant="caption">
          Forgot your password?
        </Typography>
      </Link>
    </div>
  </React.Fragment>
))

export default props => (
  <SignIn
    {...props}
    renderButton={buttonProps => <FormBottom {...buttonProps} />}
  />
)
