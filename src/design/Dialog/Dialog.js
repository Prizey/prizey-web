import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const styles = () => ({
  paper: {
    background:
      'linear-gradient(135deg, #6243db 5%, #d9427d 50%, #de4d40 90%) no-repeat',
  },
})

const PlayAgain = ({ children, classes, title, isOpen, close, confirm }) => (
  <Dialog
    open={isOpen}
    onClose={close}
    aria-labelledby={title}
    classes={classes}
    fullWidth
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{children}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={close} color="primary" autoFocus aria-label="cancel">
        Cancel
      </Button>
      <Button
        aria-label="confirm"
        onClick={() => {
          close()
          confirm()
        }}
        color="primary"
      >
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
)

export default withStyles(styles)(PlayAgain)
