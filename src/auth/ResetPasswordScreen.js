import React from 'react'
import { Redirect } from '@reach/router'
import { ResetPassword } from 'croods-auth'
import { NewPassword } from 'seasoned-auth-forms-web'

import AuthForm from './AuthForm'

export const appendToken = (create, location) => values => {
  const urlParams = new URLSearchParams(location.search)

  return create({
    ...values,
    resetPasswordToken: urlParams.get('reset_password_token'),
  })
}

export default props => (
  <ResetPassword
    {...props}
    setCurrentUser={() => {}}
    render={renderProps =>
      AuthForm(NewPassword)({
        ...renderProps,
        create: appendToken(renderProps.create, renderProps.location),
      })
    }
    renderCreated={() => <Redirect to="/" noThrow />}
  />
)
