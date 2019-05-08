import React from 'react'
import { SignOut } from 'croods-auth'
import { Redirect } from '@reach/router'

export default ({ children, className, ...props }) => (
  <SignOut
    {...props}
    render={({ destroy }) => (
      <span
        className={className}
        style={{ color: 'white', cursor: 'pointer' }}
        onClick={destroy}
      >
        {children}
      </span>
    )}
    renderDestroyed={() => <Redirect to="/sign-in" noThrow />}
  />
)
