import React from 'react'
import { Redirect } from '@reach/router'
import { ResetPassword } from 'croods-auth'
import { NewPassword } from 'seasoned-auth-forms-web'

import Layout from 'components/Layout/Layout'

export const appendToken = (create, location) => values => {
  const urlParams = new URLSearchParams(location.search)

  return create({
    ...values,
    resetPasswordToken: urlParams.get('reset_password_token'),
  })
}

export const Form = ({ create, creating, error, location }) => (
  <Layout>
    <NewPassword
      onSubmit={appendToken(create, location)}
      submitting={creating}
      submitError={error}
    />
  </Layout>
)

export default props => (
  <ResetPassword
    {...props}
    setCurrentUser={() => {}}
    render={renderProps => <Form {...renderProps} />}
    renderCreated={() => <Redirect to="/" noThrow />}
  />
)
