import React from 'react'
import { Button, Typography } from '@material-ui/core'
import Layout from 'design/Layout/Layout'
import { Redirect } from '@reach/router'

import UserForm from 'auth/UserForm'

export default ({ currentUser }) =>
  currentUser ? (
    <Layout>
      <Typography align="center" variant="h5">
        Shipping Address
      </Typography>
      <UserForm />
      <Button variant="contained" color="primary" fullWidth>
        SHIP IT!
      </Button>
    </Layout>
  ) : (
    <Redirect to="/sign-in?next=/shipping-info" noThrow />
  )
