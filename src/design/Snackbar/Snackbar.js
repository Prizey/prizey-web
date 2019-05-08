import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const SimpleSnackbar = ({ isOpen, close, ...props }) => (
  <div>
    <Snackbar
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={close}
      ContentProps={{
        'aria-describedby': props.message,
      }}
      message={
        <span id="message-id" style={{ alignItems: 'center', display: 'flex' }}>
          <CheckCircleIcon style={{ marginRight: '10px' }} />
          {props.message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          style={{ padding: '5px' }}
          onClick={close}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  </div>
)

SimpleSnackbar.propTypes = {
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
}

export default SimpleSnackbar
