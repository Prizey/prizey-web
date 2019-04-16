import React from 'react'
import Typography from '@material-ui/core/Typography'

export default ({ style, ...props }) => (
  <div style={{ padding: 40, textAlign: 'center', ...style }}>
    <Typography color="error" variant="h5" {...props} />
  </div>
)
