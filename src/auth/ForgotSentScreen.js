import React from 'react'
import Layout from 'design/Layout/Layout'
import { Typography } from '@material-ui/core'

export default ({ currentUser, location }) => (
  <Layout location={location} currentUser={currentUser}>
    <Typography variant="h6" align="center">
      Instructions for reseting your password have been sent to your email
    </Typography>
  </Layout>
)
