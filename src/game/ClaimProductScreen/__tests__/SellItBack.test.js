import React from 'react'
import renderer, { act } from 'react-test-renderer'
import SellItBack, {
  SellItBackComponent,
  handleConfirm,
  afterCreate,
} from '../SellItBack'

jest.mock('@material-ui/core/Dialog', () => ({ children, ...props }) => (
  <div {...props}>{children}</div>
))

jest.mock('croods', () => ({
  New: props => (
    <div {...props}>
      New - <div>render - {props.render(props)}</div>
    </div>
  ),
}))

describe('when component is mounted', () => {
  it('renders correctly', () => {
    act(() => {
      const params = {
        currentUser: { tickets: 10 },
        navigate: jest.fn(),
        setCurrentUser: jest.fn(),
      }
      const tree = renderer.create(<SellItBack {...params} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})

describe('when component is triggered', () => {
  it('open modal', () => {
    const params = {
      amount: 3,
      classes: {},
      clearProduct: jest.fn(),
    }
    const tree = renderer.create(<SellItBackComponent {...params} />).root

    tree.findByProps({ 'aria-label': 'Sell it Back' }).props.onClick()
    expect(tree.instance.state.dialogIsOpen).toEqual(true)
  })

  describe('when the dialog appears', () => {
    it('call the create when click on confirm', () => {
      const params = {
        amount: 3,
        create: jest.fn(),
        creating: false,
      }

      handleConfirm(params)()
      expect(params.create).toHaveBeenCalledTimes(1)
    })

    it("do nothing if it's creating", () => {
      const params = {
        amount: 3,
        create: jest.fn(),
        creating: true,
      }

      handleConfirm(params)()
      expect(params.create).not.toHaveBeenCalled()
    })

    it('close the dialog when click on close button', () => {
      const params = {
        amount: 3,
        classes: {},
        clearProduct: jest.fn(),
      }
      const tree = renderer.create(<SellItBackComponent {...params} />).root

      tree.findByProps({ 'aria-label': 'Play again modal' }).props.close()
      expect(tree.instance.state.dialogIsOpen).toEqual(false)
    })
  })

  describe('when confirming in the dialog', () => {
    it('call the navigate and set the user tickets', () => {
      const params = {
        currentUser: { id: 1, tickets: 10 },
        navigate: jest.fn(),
        setCurrentUser: jest.fn(),
      }

      afterCreate(params)()
      expect(params.setCurrentUser).toHaveBeenCalledWith({
        id: 1,
        tickets: params.currentUser.tickets + 3,
      })
      expect(params.navigate).toHaveBeenCalledWith('/sold-back')
    })
  })
})
