import React from 'react'
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
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
    width: '100%',
  },
  footerLink: {
    textDecoration: 'none',
  },
  header: {
    height: `${parseInt(theme.spacing.md, 10) * 2}px`,
    padding: [
      `${parseInt(theme.spacing.xs, 10) / 2}px`,
      `${parseInt(theme.spacing.md, 10) / 2}px`,
    ].join(' '),
    width: '100%',
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

const footerLinks = [
  { href: 'https://termly.io/en/', label: 'TERMS' },
  { href: 'https://termly.io/en/', label: 'PRIVACY' },
  { href: 'https://termly.io/en/', label: 'FAIRNESS' },
  { href: 'https://termly.io/en/', label: 'ALL PRIZES' },
]

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
        <div className={classes.footer}>
          {footerLinks.map(link => (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              key={link.label}
              className={classes.footerLink}
            >
              <Typography
                align="center"
                variant="caption"
                color="textSecondary"
              >
                {link.label}
              </Typography>
            </a>
          ))}
        </div>
      </div>
    </div>
  ),
)
