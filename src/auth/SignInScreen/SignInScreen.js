import React, { useEffect } from 'react'
import { Redirect } from '@reach/router'
import { SignIn } from 'croods-auth'
import SignInForm from './SignInForm'

import AuthForm from '../AuthForm'

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
    <React.Fragment>
      <SignIn
        currentUser={currentUser}
        navigate={navigate}
        {...props}
        render={AuthForm(SignInForm, 'Login')}
        renderCreated={() => <Redirect to="/" noThrow />}
      />
    </React.Fragment>
  )
}
