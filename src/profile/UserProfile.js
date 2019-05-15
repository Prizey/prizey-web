import React from 'react'
import { New } from 'croods'
import { Button, Typography } from '@material-ui/core'
import Layout from 'design/Layout/Layout'
import { Redirect } from '@reach/router'

import { useFlash } from 'seasoned-flash'
import GoBack from 'design/GoBack/GoBack'

import UserForm from 'auth/UserForm'
import Logout from 'auth/Logout'

const UserProfile = ({
  currentUser,
  create,
  creating,
  error,
  location,
  setCurrentUser,
}) => (
  <Layout
    location={location}
    leftIcon={<GoBack to="/" />}
    rightIcon={
      <Logout setCurrentUser={setCurrentUser} currentUser={currentUser}>
        <Typography align="left" style={{ marginRight: '20px' }}>
          Logout
        </Typography>
      </Logout>
    }
  >
    <Typography align="center" variant="h5" style={{ marginTop: '-20px' }}>
      Profile
    </Typography>

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

export default ({ currentUser, setCurrentUser, location }) => {
  const { success } = useFlash()

  return currentUser ? (
    <New
      name="users"
      path="/auth"
      method="PUT"
      render={props => (
        <UserProfile
          {...props}
          currentUser={currentUser}
          location={location}
          setCurrentUser={setCurrentUser}
        />
      )}
      renderCreated={response => {
        setCurrentUser(response.data)
      }}
      afterCreate={() => {
        success('You updated your profile!')
      }}
    />
  ) : (
    <Redirect to="/sign-in?next=/profile" noThrow />
  )
}
