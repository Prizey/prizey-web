import React from 'react'
import { Redirect } from '@reach/router'
import { ForgotPassword } from 'croods-auth'
import { ForgotPassword as ForgotPasswordForm } from 'seasoned-auth-forms-web'

import Layout from 'components/Layout/Layout'

export const appendRedirect = create => values =>
  create({
    ...values,
    redirectUrl: `${process.env.REACT_APP_WEB_URL}/reset-password`,
  })

export const Form = ({ create, creating, error }) => (
  <Layout>
    <ForgotPasswordForm
      onSubmit={appendRedirect(create)}
      submitting={creating}
      submitError={error}
    />
  </Layout>
)

export default props => (
  <ForgotPassword
    {...props}
    render={renderProps => <Form {...renderProps} />}
    renderCreated={() => <Redirect to="/forgot-password/sent" noThrow />}
  />
)
