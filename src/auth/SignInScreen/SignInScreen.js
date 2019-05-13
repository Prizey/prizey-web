import React, { useEffect } from 'react'
import { SignIn } from 'croods-auth'
import SignInForm from './SignInForm'
import createAuthForm from '../AuthForm'

const AuthForm = createAuthForm(SignInForm, 'Login')

export default ({ currentUser, location, navigate, ...props }) => {
  useEffect(() => {
    if (currentUser) {
      const queryString = new URLSearchParams(location.search)
      navigate(queryString.get('next') || '/', {
        replace: true,
      })
    }
  }, [currentUser, location, navigate])

  return (
    <SignIn
      location={location}
      currentUser={currentUser}
      navigate={navigate}
      {...props}
      render={renderProps => <AuthForm {...renderProps} />}
      renderCreated={() => null}
    />
  )
}
