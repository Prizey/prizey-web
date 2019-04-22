import React, { useEffect } from 'react'
import { Redirect } from '@reach/router'
import { SignIn } from 'croods-auth'
import { SignIn as SignInForm } from 'seasoned-auth-forms-web'

import AuthForm from './AuthForm'

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
      render={AuthForm(SignInForm)}
      renderCreated={() => <Redirect to="/" noThrow />}
    />
  )
}
