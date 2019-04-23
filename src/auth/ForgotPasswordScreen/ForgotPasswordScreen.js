import React from 'react'
import { Redirect } from '@reach/router'
import { ForgotPassword } from 'croods-auth'
import ForgotPasswordForm from './ForgotPasswordForm'
import createAuthForm from '../AuthForm'

const AuthForm = createAuthForm(ForgotPasswordForm, 'Reset Your Password')

export const appendRedirect = create => values =>
  create({
    ...values,
    redirectUrl: `${process.env.REACT_APP_WEB_URL}/reset-password`,
  })

export default props => (
  <ForgotPassword
    {...props}
    render={renderProps => (
      <AuthForm {...renderProps} create={appendRedirect(renderProps.create)} />
    )}
    renderCreated={() => <Redirect to="/forgot-password/sent" noThrow />}
  />
)
