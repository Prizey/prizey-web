import React from 'react'
import { Redirect } from '@reach/router'
import { SignUp } from 'croods-auth'
import { SignUp as SignUpForm } from 'seasoned-auth-forms-web'

import AuthForm from './AuthForm'

export default props => {
  if (props.currentUser) return <Redirect to="/" noThrow />

  return (
    <SignUp
      {...props}
      render={AuthForm(SignUpForm)}
      renderCreated={() => <Redirect to="/" noThrow />}
    />
  )
}
