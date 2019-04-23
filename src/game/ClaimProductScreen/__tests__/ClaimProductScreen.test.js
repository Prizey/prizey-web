import React from 'react'
import renderer from 'react-test-renderer'
import ClaimProductScreen, { mapState } from '../ClaimProductScreen'

jest.mock('react-redux', () => ({
  connect: () => Component => props => (
    <Component
      {...props}
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
    .create(<ClaimProductScreen currentUser difficulty="easy" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('redirects correctly', () => {
  const tree = renderer.create(<ClaimProductScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('map the state to props', () => {
  const order = {
    product: { image: '/mock/trump-mask.png', title: 'Trump mask' },
  }

  expect(mapState({ order })).toEqual({ product: order.product })
})

it('trigger the alert', () => {
  global.alert = jest.fn()
  const tree = renderer.create(
    <ClaimProductScreen difficulty="easy" currentUser />,
  ).root

  tree.findByProps({ 'aria-label': 'I want it' }).props.onClick()
  expect(global.alert).toHaveBeenCalledTimes(1)
})
