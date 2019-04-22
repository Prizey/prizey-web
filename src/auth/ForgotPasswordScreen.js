import React from 'react'
import { Redirect } from '@reach/router'
import { ForgotPassword } from 'croods-auth'
import { ForgotPassword as ForgotPasswordForm } from 'seasoned-auth-forms-web'

import AuthForm from './AuthForm'

export const appendRedirect = create => values =>
  create({
    ...values,
    redirectUrl: `${process.env.REACT_APP_WEB_URL}/reset-password`,
  })

export default props => (
  <ForgotPassword
    {...props}
    render={renderProps =>
      AuthForm(ForgotPasswordForm)({
        ...renderProps,
        create: appendRedirect(renderProps.create),
      })
    }
    renderCreated={() => <Redirect to="/forgot-password/sent" noThrow />}
  />
)
