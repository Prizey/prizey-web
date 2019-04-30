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

it('renders correctly', () => {
  act(() => {
    const tree = renderer
      .create(<SellItBack amount={3} clearProduct={jest.fn} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

it('call the clear on after create', () => {
  const navigate = jest.fn()
  afterCreate({ navigate })()

  expect(navigate).toHaveBeenCalledTimes(1)
})

it('call the create when click on button', () => {
  const params = {
    amount: 3,
    create: jest.fn(),
    creating: false,
  }

  handleConfirm(params)()
  expect(params.create).toHaveBeenCalledTimes(1)
})

it('block the create if is creating', () => {
  const params = {
    amount: 3,
    create: jest.fn(),
    creating: true,
  }

  handleConfirm(params)()
  expect(params.create).not.toHaveBeenCalled()
})

it('open modal when click on button', () => {
  const params = {
    amount: 3,
    classes: {},
    clearProduct: jest.fn(),
  }
  const tree = renderer.create(<SellItBackComponent {...params} />).root

  tree.findByProps({ 'aria-label': 'Sell it Back' }).props.onClick()
  expect(tree.instance.state.dialogIsOpen).toEqual(true)
})

it('close modal when click on close', () => {
  const params = {
    amount: 3,
    classes: {},
    clearProduct: jest.fn(),
  }
  const tree = renderer.create(<SellItBackComponent {...params} />).root

  tree.findByProps({ 'aria-label': 'Play again modal' }).props.close()
  expect(tree.instance.state.dialogIsOpen).toEqual(false)
})
