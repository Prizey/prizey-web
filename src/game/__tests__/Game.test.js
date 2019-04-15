import React from 'react'
import renderer from 'react-test-renderer'
import Game from '../Game'

jest.mock('croods', () => ({
  Info: ({ children, ...props }) => <div {...props}>Info - {children}</div>,
  List: props => (
    <div {...props}>
      {props.children} - Render:{' '}
      {props.render([
        { id: 1, image: '/mocks/trump-mask.png', title: 'trump' },
        { id: 2, image: '/mocks/sweatshirt.png', title: 'sweatshirt' },
        { id: 3, image: '/mocks/shoe.png', title: 'shoe' },
      ])}
    </div>
  ),
  Provider: ({ children, ...props }) => (
    <div {...props}>Provider - {children}</div>
  ),
  createReducer: () => (state = {}) => state,
}))

it('renders correctly', () => {
  const tree = renderer.create(<Game />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('trigger the alert', () => {
  global.alert = jest.fn()
  const tree = renderer.create(<Game />).root

  tree.findByProps({ speed: 250 }).props.onSelectItem({ title: 'item' })

  expect(global.alert).toHaveBeenCalledTimes(1)
})
