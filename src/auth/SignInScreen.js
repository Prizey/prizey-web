import React, { useEffect } from 'react'
import { Redirect } from '@reach/router'
import { SignIn } from 'croods-auth'
import { SignIn as SignInForm } from 'seasoned-auth-forms-web'

import Layout from 'components/Layout/Layout'

export const Form = ({ create, creating, error }) => (
  <Layout>
    <SignInForm onSubmit={create} submitting={creating} submitError={error} />
  </Layout>
)

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
      render={renderProps => <Form {...renderProps} />}
      renderCreated={() => <Redirect to="/" noThrow />}
    />
  )
}
