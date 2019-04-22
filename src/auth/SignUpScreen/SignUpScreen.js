import React from 'react'
import { Redirect } from '@reach/router'
import { SignUp } from 'croods-auth'

import SignUpForm from './SignUpForm'
import AuthForm from '../AuthForm'

export default props => {
  if (props.currentUser) return <Redirect to="/" noThrow />

  return (
    <SignUp
      {...props}
      render={AuthForm(SignUpForm, 'Create your account!')}
      renderCreated={() => <Redirect to="/" noThrow />}
    />
  )
}
