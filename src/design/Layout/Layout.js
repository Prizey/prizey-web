import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  caption: {
    height: theme.spacing.lg,
    marginTop: theme.spacing.xs,
  },
  children: {
    flexGrow: 1,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    maxWidth: '375px',
    padding: theme.spacing.md,
    width: '100%',
  },
  header: {
    height: `${parseInt(theme.spacing.md, 10) * 2}px`,
    padding: [
      `${parseInt(theme.spacing.xs, 10) / 2}px`,
      `${parseInt(theme.spacing.md, 10) / 2}px`,
    ].join(' '),
    width: '100%',
  },
  logoImage: {
    marginBottom: theme.spacing.xs,
    width: '145px',
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
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
        <Fragment>
          <img src={'/logo.png'} className={classes.logoImage} alt="Prizey" />
        </Fragment>
        <div className={classes.caption}>{caption}</div>
        <div className={classes.children}>{children}</div>
        <Typography align="center" />
      </div>
    </div>
  ),
)
