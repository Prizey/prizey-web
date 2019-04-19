import React from 'react'
import Layout from 'design/Layout/Layout'

const AuthForm = Component => ({ create, creating, error }) => (
  <Layout>
    <Component onSubmit={create} submitting={creating} submitError={error} />
  </Layout>
)

export default AuthForm
