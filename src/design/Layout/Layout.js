import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Anchor from 'design/Anchor/Anchor'
import RegisterPageView from './RegisterPageView'

const styles = theme => ({
  caption: {
    height: theme.spacing.lg,
    marginTop: theme.spacing.xs,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.xs,
      maxHeight: `${parseInt(theme.spacing.lg, 10) / 2}px`,
    },
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
    [theme.breakpoints.down('xs')]: {
      maxWidth: '320px',
      paddingTop: theme.spacing.xs,
    },
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.sm,
    },
  },
  footerLink: {
    textDecoration: 'none',
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    height: `${parseInt(theme.spacing.md, 10) * 2}px`,
    justifyContent: 'space-between',
    padding: [
      `${parseInt(theme.spacing.xs, 10) / 2}px`,
      `${parseInt(theme.spacing.md, 10) / 2}px`,
    ].join(' '),
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      height: `45px`,
      padding: [`0`, `${parseInt(theme.spacing.md, 10) / 2}px`].join(' '),
    },
  },
  logoImage: {
    marginBottom: theme.spacing.xs,
    width: '145px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 0,
    },
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
  {
    href: '/terms_of_service',
    label: 'TERMS',
  },
  {
    href: '/privacy-policy',
    label: 'PRIVACY',
  },

  { href: '/faq', label: 'FAIRNESS / FAQ' },

  { href: '/all-prizes', label: 'ALL PRIZES' },
]

export default withStyles(styles)(
  ({
    classes,
    leftIcon,
    rightIcon,
    caption,
    children,
    location,
    currentUser,
    confirmLeave = false,
  }) => (
    <div className={classes.root}>
      <RegisterPageView location={location} currentUser={currentUser} />
      <div className={classes.header}>
        {leftIcon}
        {rightIcon}
      </div>
      <div className={classes.container}>
        <Anchor
          to="/"
          confirmLeave={confirmLeave}
          style={{ textDecoration: 'none' }}
        >
          <img src={'/logo.png'} className={classes.logoImage} alt="Prizey" />
        </Anchor>
        <div className={classes.caption}>{caption}</div>
        <div className={classes.children}>{children}</div>
        <div className={classes.footer}>
          {footerLinks.map(link => (
            <Anchor
              to={link.href}
              className={classes.footerLink}
              target={'_blank'}
              rel={'noopener noreferer'}
              key={link.label}
              confirmLeave={confirmLeave}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="caption"
              >
                {link.label}
              </Typography>
            </Anchor>
          ))}
        </div>
      </div>
    </div>
  ),
)
