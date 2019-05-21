import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircleOutlined'
import Anchor from 'design/Anchor/Anchor'

const styles = theme => ({
  root: {
    padding: parseInt(theme.spacing.xs, 10) / 2,
  },
})

export default withStyles(styles)(({ classes, confirmLeave = false }) => (
  <IconButton
    className={classes.root}
    aria-label="My profile"
    component={props => (
      <Anchor confirmLeave={confirmLeave} to={'/profile'} {...props} />
    )}
  >
    <AccountCircleIcon fontSize="large" />
  </IconButton>
))
