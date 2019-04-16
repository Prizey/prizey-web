import React from 'react'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  icon: {
    background: theme.palette.text.primary,
    borderRadius: `${parseInt(theme.spacing.sm, 10) / 2}px`,
    boxShadow: theme.shadows[2],
    display: 'block',
    height: theme.spacing.sm,
    marginRight: theme.spacing.xs,
    width: theme.spacing.sm,
  },
  icon_easy: {
    background: get(theme.palette, 'difficulty.easy'),
  },
  icon_hard: {
    background: get(theme.palette, 'difficulty.hard'),
  },
  icon_medium: {
    background: get(theme.palette, 'difficulty.medium'),
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
})

export default withStyles(styles)(({ difficulty, classes }) => (
  <div className={classes.root}>
    <span className={[classes.icon, classes[`icon_${difficulty}`]].join(' ')} />
    <Typography variant="subtitle1">{difficulty.toUpperCase()}</Typography>
  </div>
))
