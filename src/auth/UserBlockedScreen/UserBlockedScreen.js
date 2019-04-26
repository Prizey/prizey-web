import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Layout from 'design/Layout/Layout'

const styles = theme => ({
  pageTitle: {
    marginBottom: theme.spacing.sm,
  },
})

const createBlockedPage = withStyles(styles)(({ classes }) => (
  <Layout>
    <Typography align="center" variant="h2" className={classes.pageTitle}>
      You are blocked!
    </Typography>

    <Typography align="center" variant="h5">
      Due to recent events on your account history we blocked you, but do not
      worry, enter in contact through{' '}
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
))

export default createBlockedPage
