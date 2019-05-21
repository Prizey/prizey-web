import React, { useState } from 'react'
import { Link, navigate } from '@reach/router'
import ConfirmLeaveDialog from '../ConfirmLeaveDialog'

export const handleClose = setIsOpen => () => setIsOpen(false)
export const handleClick = (setIsOpen, confirmLeave) => evt => {
  if (confirmLeave) {
    evt.preventDefault()
    setIsOpen(true)
  }
}
export const handleOnConfirm = to => () => navigate(to)

export default ({ to, children, confirmLeave, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  if (to.startsWith('http')) {
    return (
      <React.Fragment>
        {confirmLeave && (
          <ConfirmLeaveDialog
            isOpen={isOpen}
            close={handleClose(setIsOpen)}
            confirm={handleOnConfirm(to)}
          />
        )}
        <a href={to} {...props} onClick={handleClick(setIsOpen, confirmLeave)}>
          {children}
        </a>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      {confirmLeave && (
        <ConfirmLeaveDialog
          isOpen={isOpen}
          close={handleClose(setIsOpen)}
          confirm={handleOnConfirm(to)}
        />
      )}
      <Link to={to} {...props} onClick={handleClick(setIsOpen, confirmLeave)}>
        {children}
      </Link>
    </React.Fragment>
  )
}
