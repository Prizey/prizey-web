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

const AnchorComponent = ({ to, children, ...props }) =>
  to.startsWith('http') ? (
    <a href={to} {...props}>
      {children}
    </a>
  ) : (
    <Link to={to} {...props}>
      {children}
    </Link>
  )

export default ({ confirmLeave, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <React.Fragment>
      {confirmLeave && (
        <ConfirmLeaveDialog
          isOpen={isOpen}
          close={handleClose(setIsOpen)}
          confirm={handleOnConfirm(props.to)}
        />
      )}
      <AnchorComponent
        {...props}
        onClick={handleClick(setIsOpen, confirmLeave)}
      />
    </React.Fragment>
  )
}
