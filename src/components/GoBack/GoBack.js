import React from 'react'
import { Link } from '@reach/router'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'

const styles = theme => ({
  root: {
    padding: parseInt(theme.spacing.xs, 10) / 2,
  },
})

export default withStyles(styles)(({ classes, to }) => (
  <IconButton
    className={classes.root}
    aria-label="Go Back"
    component={props => <Link to={to} {...props} />}
  >
    <ArrowLeftIcon fontSize="large" />
  </IconButton>
))
