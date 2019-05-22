import React from 'react'
import Dialog from 'design/Dialog/Dialog'

export default props => (
  <Dialog title="Are you sure?" {...props}>
    You are leaving the page and you will lose your diamonds. Are you sure?
  </Dialog>
)
