import React, { useState } from 'react'
import { New } from 'croods'
import { Button, Typography } from '@material-ui/core'
import Layout from 'design/Layout/Layout'
import { Redirect } from '@reach/router'

import SimpleSnackBar from 'design/Snackbar/Snackbar'

import UserForm from 'auth/UserForm'

export const UserProfile = ({
  isOpen,
  isClose,
  currentUser,
  create,
  creating,
  error,
}) => (
  <Layout>
    <Typography align="center" variant="h5">
      My Profile
    </Typography>

    <SimpleSnackBar
      isOpen={isOpen}
      close={isClose}
      message={'You updated your profile!'}
    />

    <UserForm
      onSubmit={create}
      submitting={creating}
      submitError={error}
      user={currentUser}
      showPassword={true}
      renderButton={() => (
        <Button variant="contained" color="primary" type="submit" fullWidth>
          UPDATE PROFILE
        </Button>
      )}
    />
    <Button
      href={'mailto:contact@prizey.app'}
      variant="outlined"
      color="primary"
      type="link"
      fullWidth
    >
      CONTACT US
    </Button>
  </Layout>
)

export default ({ currentUser, setCurrentUser }) => {
  const [isOpen, setIsOpen] = useState(false)

  return currentUser ? (
    <New
      name="users"
      path="/auth"
      method="PUT"
      render={props => (
        <UserProfile
          {...props}
          isOpen={isOpen}
          isClose={() => setIsOpen(false)}
          currentUser={currentUser}
        />
      )}
      renderCreated={response => {
        setCurrentUser(response.data)
        setIsOpen(true)
      }}
    />
  ) : (
    <Redirect to="/sign-in?next=/profile" noThrow />
  )
}
