import React from 'react'
import { New } from 'croods'
import { Button, Typography } from '@material-ui/core'
import Layout from 'design/Layout/Layout'
import { Redirect } from '@reach/router'

import UserForm from 'auth/UserForm'

export const ShippingForm = ({ currentUser, create, creating, error }) => (
  <Layout>
    <Typography align="center" variant="h5">
      Shipping Address
    </Typography>
    <UserForm
      onSubmit={create}
      submitting={creating}
      submitError={error}
      user={currentUser}
      renderButton={() => (
        <Button variant="contained" color="primary" type="submit" fullWidth>
          SHIP IT!
        </Button>
      )}
    />
  </Layout>
)

export default ({ currentUser }) =>
  currentUser ? (
    <New
      name="users"
      path="/auth"
      method="PUT"
      render={props => <ShippingForm {...props} currentUser={currentUser} />}
      renderCreated={() => <Redirect to="/shipping-info/confirm" noThrow />}
    />
  ) : (
    <Redirect to="/sign-in?next=/shipping-info" noThrow />
  )