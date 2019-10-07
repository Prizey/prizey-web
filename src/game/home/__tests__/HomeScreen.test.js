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
        mediumCarouselSpeed: 500,
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

describe('when component is mounted', () => {
  describe('when user is logged in', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(<HomeScreen nextUrl="foo" currentUser />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('renders correctly with external nextUrl link', () => {
      const tree = renderer
        .create(<HomeScreen nextUrl="foo" currentUser isNextUrlExternal />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when user is not logged in', () => {
    it('redirects correctly', () => {
      const tree = renderer.create(<HomeScreen nextUrl="foo" />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('redirects correctly with external nextUrl link', () => {
      const tree = renderer
        .create(<HomeScreen nextUrl="foo" isNextUrlExternal />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
