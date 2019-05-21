import React from 'react'
import renderer from 'react-test-renderer'
import ConfirmLeaveDialog from '../ConfirmLeaveDialog'

jest.mock('@material-ui/core/Dialog', () => ({ children, ...props }) => (
  <div {...props}>{children}</div>
))

it('call the close on click on cancel', () => {
  const params = {
    onClose: jest.fn(),
  }
  const tree = renderer.create(<ConfirmLeaveDialog {...params} />).root

  tree.findByProps({ 'aria-label': 'cancel' }).props.onClick()
  expect(params.onClose).toHaveBeenCalledTimes(1)
})

it('call the confirm on click on confirm', () => {
  const params = {
    onClose: jest.fn(),
    onConfirm: jest.fn(),
  }
  const tree = renderer.create(<ConfirmLeaveDialog {...params} />).root

  tree.findByProps({ 'aria-label': 'confirm' }).props.onClick()
  expect(params.onConfirm).toHaveBeenCalledTimes(1)
})
