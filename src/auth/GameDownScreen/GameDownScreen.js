import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Layout from 'design/Layout/Layout'

const styles = theme => ({
  pageTitle: {
    marginBottom: theme.spacing.sm,
  },
})

const createGameDownPage = withStyles(styles)(
  ({ classes, currentUser, location }) => (
    <Layout location={location} currentUser={currentUser}>
      <Typography align="center" variant="h2" className={classes.pageTitle}>
        The game is closed for maintanance
      </Typography>

      <Typography align="center" variant="h5">
        <Button
          href="mailto:contact@prizeyapp.com"
          variant="contained"
          color="primary"
          fullWidth
        >
          contact@prizeyapp.com
        </Button>
      </Typography>
    </Layout>
  ),
)

export default createGameDownPage
