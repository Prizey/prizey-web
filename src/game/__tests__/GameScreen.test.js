import React from 'react'
import renderer from 'react-test-renderer'
import GameScreen from '../GameScreen'

const mockList = [
  { id: 1, image: '/mocks/trump-mask.png', title: 'trump' },
  { id: 2, image: '/mocks/sweatshirt.png', title: 'sweatshirt' },
  { id: 3, image: '/mocks/shoe.png', title: 'shoe' },
]

jest.mock('react-redux', () => ({
  connect: () => Component => props => (
    <Component {...props} chooseProduct={jest.fn} />
  ),
}))

jest.mock('croods', () => ({
  Info: ({ children, ...props }) => (
    <div {...props}>
      Info -{' '}
      {props.render({
        easyCarouselSpeed: 500,
        priceMultiplier: 1,
      })}
    </div>
  ),
  List: props => (
    <div {...props}>
      {props.children} - Render: {props.render(mockList)}
    </div>
  ),
  Provider: ({ children, ...props }) => (
    <div {...props}>Provider - {children}</div>
  ),
  createReducer: () => (state = {}) => state,
}))

it('renders correctly', () => {
  const tree = renderer.create(<GameScreen currentUser />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('trigger the alert', () => {
  const navigate = jest.fn()
  const tree = renderer.create(<GameScreen currentUser navigate={navigate} />)
    .root

  tree
    .findByProps({ 'aria-label': 'roulette' })
    .props.onSelectItem({ title: 'item' })
  expect(navigate).toHaveBeenCalledTimes(1)
})

describe("when we don't have the currentUser yet", () => {
  it('redirects correctly', () => {
    const tree = renderer.create(<GameScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
