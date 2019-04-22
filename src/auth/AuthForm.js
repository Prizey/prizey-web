import React from 'react'
import { Typography } from '@material-ui/core'
import Layout from 'design/Layout/Layout'

const AuthForm = (Component, title) => ({ create, creating, error }) => (
  <Layout>
    <Typography align="center" variant="h5">
      {title}
    </Typography>
    <Component onSubmit={create} submitting={creating} submitError={error} />
  </Layout>
)

export default AuthForm
