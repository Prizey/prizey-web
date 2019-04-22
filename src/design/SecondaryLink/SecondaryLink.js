import React from 'react'
import { Link } from '@reach/router'
import { Typography } from '@material-ui/core'

export default ({ to, label }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <Typography color="primary" variant="caption">
      {label}
    </Typography>
  </Link>
)
