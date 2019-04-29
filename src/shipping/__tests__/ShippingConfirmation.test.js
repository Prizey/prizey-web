import React from 'react'
import renderer from 'react-test-renderer'
import ShippingConfirmation, { mapState } from '../ShippingConfirmation'

jest.mock('react-redux', () => ({
  connect: () => Component => props => (
    <Component
      {...props}
      clearProduct={jest.fn()}
      product={{ image: '/mock/trump-mask.png', title: 'Trump mask' }}
    />
  ),
}))

jest.mock('croods', () => ({
  New: props => (
    <div {...props}>
      New - <div>render - {props.render(props)}</div>
    </div>
  ),
}))

it('renders correctly', () => {
  const tree = renderer
    .create(<ShippingConfirmation currentUser difficulty="easy" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('redirects correctly', () => {
  const tree = renderer.create(<ShippingConfirmation />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('map the state to props', () => {
  const basket = {
    product: { image: '/mock/trump-mask.png', title: 'Trump mask' },
  }

  expect(mapState({ basket })).toEqual({ product: basket.product })
})

it('trigger the alert', () => {
  const navigate = jest.fn()
  const tree = renderer.create(
    <ShippingConfirmation currentUser navigate={navigate} />,
  ).root

  tree.findByProps({ 'aria-label': 'Play again' }).props.onClick()
  expect(navigate).toHaveBeenCalledTimes(1)
})
