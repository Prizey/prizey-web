import React from 'react'
import renderer from 'react-test-renderer'
import HomeScreen from '../HomeScreen'

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

jest.mock('../../../design/Layout/RegisterPageView')

it('renders correctly', () => {
  const tree = renderer.create(<HomeScreen currentUser />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('redirects correctly', () => {
  const tree = renderer.create(<HomeScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})
