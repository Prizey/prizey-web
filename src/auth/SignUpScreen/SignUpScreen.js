import React from 'react'
import { Redirect } from '@reach/router'
import { SignUp } from 'croods-auth'

import SignUpForm from './SignUpForm'
import createAuthForm from '../AuthForm'

const AuthForm = createAuthForm(SignUpForm, 'Create your account!')

export default props => {
  if (props.currentUser) return <Redirect to="/" noThrow />

  return (
    <SignUp
      {...props}
      render={renderProps => <AuthForm {...renderProps} />}
      renderCreated={() => <Redirect to="/" noThrow />}
    />
  )
}
