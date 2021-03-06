import React from 'react'
import { New } from 'croods'
import { Button, Typography } from '@material-ui/core'
import Layout from 'design/Layout/Layout'
import { Redirect } from '@reach/router'

import UserForm from 'auth/UserForm'
import UserBalance from 'design/UserBalance'
import ProfileLink from 'design/ProfileLink/ProfileLink'

export const ShippingForm = ({
  currentUser,
  location,
  create,
  creating,
  error,
}) => (
  <Layout
    leftIcon={<UserBalance />}
    rightIcon={<ProfileLink confirmLeave />}
    location={location}
    currentUser={currentUser}
    confirmLeave
  >
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

export default ({ currentUser, location, setCurrentUser }) =>
  currentUser ? (
    <New
      name="users"
      path="/auth"
      method="PUT"
      render={props => (
        <ShippingForm
          {...props}
          currentUser={currentUser}
          location={location}
        />
      )}
      renderCreated={response => {
        setCurrentUser(response.data)
        return <Redirect to="/shipping-info/confirm" noThrow />
      }}
    />
  ) : (
    <Redirect to="/sign-in?next=/game" noThrow />
  )
