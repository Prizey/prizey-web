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

const ConfirmLeaveDialog = ({ classes, isOpen, onClose, onConfirm }) => (
  <Dialog
    open={isOpen}
    onClose={onClose}
    aria-labelledby="Are you sure?"
    classes={classes}
    fullWidth
  >
    <DialogTitle>Are you sure?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        You are leaving the page and you will lose your tickets. Are you sure?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus aria-label="cancel">
        Cancel
      </Button>
      <Button
        aria-label="confirm"
        onClick={() => {
          onClose()
          onConfirm()
        }}
        color="primary"
      >
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
)

export default withStyles(styles)(ConfirmLeaveDialog)
