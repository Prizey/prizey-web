import React from 'react'
import { Link } from '@reach/router'

export default ({ to, children, ...props }) => {
  if (to.startsWith('http')) {
    return (
      <a href={to} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  )
}
