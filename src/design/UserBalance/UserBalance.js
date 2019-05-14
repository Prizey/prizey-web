import React from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  icon: {
    height: theme.spacing.md,
    marginRight: theme.spacing.xs,
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
    },
  },
})

export const UserBalanceComponent = withStyles(styles)(({ classes, user }) => (
  <div className={classes.root}>
    <img src="/icons/diamond.png" alt="diamond" className={classes.icon} />
    <Typography>{user ? user.tickets : '0'}</Typography>
  </div>
))

export const mapState = ({ auth }) => ({
  user: get(auth, 'currentUser.0.state.info'),
})

export default connect(
  mapState,
  null,
)(UserBalanceComponent)
