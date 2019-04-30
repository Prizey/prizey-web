import React from 'react'
import renderer from 'react-test-renderer'
import PlayAgain from '../PlayAgain'

jest.mock('@material-ui/core/Dialog', () => ({ children, ...props }) => (
  <div {...props}>{children}</div>
))

it('call the close on click on cancel', () => {
  const params = {
    close: jest.fn(),
  }
  const tree = renderer.create(<PlayAgain {...params} />).root

  tree.findByProps({ 'aria-label': 'cancel' }).props.onClick()
  expect(params.close).toHaveBeenCalledTimes(1)
})

it('call the confirm on click on confirm', () => {
  const params = {
    close: jest.fn(),
    confirm: jest.fn(),
  }
  const tree = renderer.create(<PlayAgain {...params} />).root

  tree.findByProps({ 'aria-label': 'confirm' }).props.onClick()
  expect(params.confirm).toHaveBeenCalledTimes(1)
})
