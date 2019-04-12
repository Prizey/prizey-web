import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

/**
 * Props:
 *  LeftIcon
 *  RightIcon
 *  caption
 *  children
 */

const styles = () => ({
  caption: {
    height: '80px',
  },
  children: {
    flexGrow: 1,
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    maxWidth: '375px',
    padding: '30px 20px',
    width: '100%',
  },
  header: {
    height: '50px',
    padding: '8px 15px',
    width: '100%',
  },
  root: {
    alignItems: 'center',
    background: 'linear-gradient(135deg, #6243db 5%, #d9427d 50%, #de4d40 90%)',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    width: '100vw',
  },
})

export default withStyles(styles)(
  ({ classes, leftIcon, rightIcon, caption, children }) => (
    <div className={classes.root}>
      <div className={classes.header}>
        {leftIcon}
        {rightIcon}
      </div>
      <div className={classes.container}>
        <Typography align="center" variant="h2">
          PRIZEY
        </Typography>
        <div className={classes.caption}>{caption}</div>
        <div className={classes.children}>{children}</div>
        <Typography align="center">Footer</Typography>
      </div>
    </div>
  ),
)
