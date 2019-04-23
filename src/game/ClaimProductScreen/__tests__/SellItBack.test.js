import React from 'react'
import renderer from 'react-test-renderer'
import SellItBack, { afterCreate, createInnerComponent } from '../SellItBack'

jest.mock('croods', () => ({
  New: props => (
    <div {...props}>
      New - <div>render - {props.render(props)}</div>
    </div>
  ),
}))

it('renders correctly', () => {
  const tree = renderer
    .create(<SellItBack amount={3} clearProduct={jest.fn} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('call the clear on after create', () => {
  const clearProduct = jest.fn()
  afterCreate({ clearProduct })()

  expect(clearProduct).toHaveBeenCalledTimes(1)
})

it('call the create when click on button', () => {
  const Component = createInnerComponent({ amount: 3, classes: {} })
  const params = {
    create: jest.fn(),
    creating: false,
    error: null,
  }
  const tree = renderer.create(<Component {...params} />).root
  tree.findByProps({ 'aria-label': 'action-button' }).props.onClick()

  expect(params.create).toHaveBeenCalledTimes(1)
})
