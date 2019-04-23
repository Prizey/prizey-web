import React, { useEffect } from 'react'
import { Redirect } from '@reach/router'
import { SignIn } from 'croods-auth'
import SignInForm from './SignInForm'
import createAuthForm from '../AuthForm'

const AuthForm = createAuthForm(SignInForm, 'Login')

export default ({ currentUser, navigate, ...props }) => {
  useEffect(() => {
    if (currentUser) {
      const queryString = new URLSearchParams(window.location.search)
      navigate(queryString.get('next') || '/', {
        replace: true,
      })
    }
  }, [currentUser, navigate])

  return (
    <SignIn
      currentUser={currentUser}
      navigate={navigate}
      {...props}
      render={renderProps => <AuthForm {...renderProps} />}
      renderCreated={() => <Redirect to="/" noThrow />}
    />
  )
}
