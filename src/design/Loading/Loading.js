import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default ({ style = {} } = {}) => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      ...style,
    }}
  >
    <CircularProgress size={60} color="primary" />
  </div>
)
