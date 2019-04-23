import React from 'react'
import { Button } from '@material-ui/core'

export default ({ label, ...props }) => (
  <Button {...props} variant="contained" color="primary" fullWidth>
    {label}
  </Button>
)
