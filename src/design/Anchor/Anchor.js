import React, { useState } from 'react'
import { Link, navigate } from '@reach/router'
import ConfirmLeaveDialog from '../ConfirmLeaveDialog'

export const handleClick = (setIsOpen, confirmLeave) => evt => {
  if (confirmLeave) {
    evt.preventDefault()
    setIsOpen(true)
  }
}
const handleOnConfirm = to => () => navigate(to)

export default ({ to, children, confirmLeave, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)

  if (to.startsWith('http')) {
    return (
      <React.Fragment>
        {confirmLeave && (
          <ConfirmLeaveDialog
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleOnConfirm(to)}
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
          onClose={onClose}
          onConfirm={handleOnConfirm(to)}
        />
      )}
      <Link to={to} {...props} onClick={handleClick(setIsOpen, confirmLeave)}>
        {children}
      </Link>
    </React.Fragment>
  )
}
