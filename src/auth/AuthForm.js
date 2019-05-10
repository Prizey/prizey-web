import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Layout from 'design/Layout/Layout'

const styles = theme => ({
  pageTitle: {
    marginBottom: theme.spacing.sm,
  },
})

const createAuthForm = (Component, title) =>
  withStyles(styles)(
    ({ classes, create, creating, error, currentUser, location }) => (
      <Layout location={location} currentUser={currentUser}>
        <Typography align="center" variant="h5" className={classes.pageTitle}>
          {title}
        </Typography>
        <Component
          onSubmit={create}
          submitting={creating}
          submitError={error}
        />
      </Layout>
    ),
  )

export default createAuthForm
