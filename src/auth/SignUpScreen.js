import React from 'react'
import { Redirect } from '@reach/router'
import { SignUp } from 'croods-auth'
import { SignUp as SignUpForm } from 'seasoned-auth-forms-web'

import Layout from 'components/Layout/Layout'

export const Form = ({ create, creating, error }) => (
  <Layout>
    <SignUpForm onSubmit={create} submitting={creating} submitError={error} />
  </Layout>
)

export default props => {
  if (props.currentUser) return <Redirect to="/" noThrow />

  return (
    <SignUp
      {...props}
      render={renderProps => <Form {...renderProps} />}
      renderCreated={() => <Redirect to="/" noThrow />}
    />
  )
}
