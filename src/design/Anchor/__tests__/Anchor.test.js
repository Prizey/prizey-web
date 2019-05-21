import React from 'react'
import renderer from 'react-test-renderer'
import { navigate } from '@reach/router'
import Anchor, { handleOnConfirm, handleClose, handleClick } from '../Anchor'

jest.mock('@reach/router', () => ({
  Link: props => <div {...props}>Link - {props.children}</div>,
  navigate: jest.fn(),
}))

describe('when the component is mounted', () => {
  it('renders correctly', () => {
    const params = { to: '/' }
    const tree = renderer.create(<Anchor {...params} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with confirmLeave', () => {
    const params = { confirmLeave: true, to: '/' }
    const tree = renderer.create(<Anchor {...params} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('when the component is clicked', () => {
  it('open the dialog if confirmLeave is true', () => {
    const mockState = jest.fn()
    const confirmLeave = true

    handleClick(mockState, confirmLeave)({ preventDefault: jest.fn() })
    expect(mockState).toHaveBeenCalledWith(true)
  })

  it('do nothing if confirmLeave is false', () => {
    const mockState = jest.fn()
    const confirmLeave = false

    handleClick(mockState, confirmLeave)({ preventDefault: jest.fn() })
    expect(mockState).not.toHaveBeenCalled()
  })

  describe('when the dialog appears', () => {
    it('close the dialog when click on cancel in dialog', () => {
      const mockSetIsOpen = jest.fn()

      handleClose(mockSetIsOpen)()
      expect(mockSetIsOpen).toHaveBeenCalledWith(false)
    })

    it('call the navigate when click on confirm in dialog', () => {
      const to = '/'

      handleOnConfirm(to)()
      expect(navigate).toHaveBeenCalledWith(to)
    })
  })
})
