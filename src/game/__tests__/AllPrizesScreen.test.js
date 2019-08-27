import React from 'react'
import renderer from 'react-test-renderer'
import AllPrizesScreen from '../AllPrizesScreen'

const mockList = [
  { id: 1, image: '/mocks/trump-mask.png', price: 2, title: 'trump' },
  { id: 2, image: '/mocks/sweatshirt.png', price: 2, title: 'sweatshirt' },
  { id: 3, image: '/mocks/shoe.png', price: 2, title: 'shoe' },
]

jest.mock('../../design/Layout/RegisterPageView')
jest.mock('design/UserBalance', () => () => null)

jest.mock('react-redux', () => ({
  connect: () => Component => props => (
    <Component {...props} insertCoin={jest.fn} />
  ),
}))

jest.mock('croods', () => ({
  Info: ({ children, ...props }) => (
    <div {...props}>
      Info -{' '}
      {props.render({
        easyTicketAmount: 1,
        hardicketAmount: 2,
        mediumTicketAmount: 3,
      })}
    </div>
  ),
  List: props => (
    <div {...props}>
      {props.children} - Render: {props.render(mockList)}
      RenderLoading: {props.renderLoading()}
    </div>
  ),
  New: props => (
    <div {...props}>
      New - <div>render - {props.render(props)}</div>
    </div>
  ),
  Provider: ({ children, ...props }) => (
    <div {...props}>Provider - {children}</div>
  ),
  createReducer: () => (state = {}) => state,
}))

jest.mock('design/AdminText/AdminText', () => props => (
  <div {...props}>
    AdminText -{' '}
    {props.render({
      difficultyFirstLevelLabel: 'Foo 1',
      difficultySecondLevelLabel: 'Foo 2',
      difficultyThirdLevelLabel: 'Foo 3',
    })}
  </div>
))

it('renders correctly', () => {
  const params = {
    currentUser: {
      tickets: 10,
    },
  }
  const tree = renderer.create(<AllPrizesScreen {...params} />).toJSON()
  expect(tree).toMatchSnapshot()
})
