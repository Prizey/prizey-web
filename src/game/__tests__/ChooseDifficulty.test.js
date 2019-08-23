import React from 'react'
import renderer from 'react-test-renderer'
import ChooseDifficultyScreen from '../ChooseDifficultyScreen'

const mockList = [
  { id: 1, price: 10.0, ticketAmount: 10 },
  { id: 2, price: 20.0, ticketAmount: 20 },
  { id: 3, price: 30.0, ticketAmount: 30 },
]

jest.mock('../../design/Layout/RegisterPageView')
jest.mock('design/UserBalance', () => () => null)

jest.mock('react-redux', () => ({
  connect: () => Component => props => (
    <Component {...props} insertCoin={jest.fn} />
  ),
}))

jest.mock('croods', () => ({
  List: props => <div {...props}>List: {props.render(mockList)}</div>,
  New: props => (
    <div {...props}>
      New - <div>render - {props.render(props)}</div>
    </div>
  ),
}))

jest.mock('../../design/AdminText/AdminText', () => props => (
  <div {...props}>
    AdminText -{' '}
    {props.render({
      difficultyBottomText: 'The harder difficulty, the better the prizes.',
      difficultyFirstLevelLabel: 'EASY',
      difficultySecondLevelLabel: 'MEDIUM',
      difficultyThirdLevelLabel: 'HARD',
      difficultyTitle: 'Pick a difficulty',
    })}
  </div>
))

jest.mock('@reach/router', () => ({
  Link: ({ children, ...props }) => <div {...props}>Link - {children}</div>,
  Redirect: props => <div {...props}>Redirect</div>,
  navigate: jest.fn(),
}))

it('renders correctly', () => {
  const params = {
    currentUser: {
      tickets: 10,
    },
  }
  const tree = renderer.create(<ChooseDifficultyScreen {...params} />).toJSON()
  expect(tree).toMatchSnapshot()
})

describe("when we don't have the currentUser yet", () => {
  it('redirects correctly', () => {
    const tree = renderer.create(<ChooseDifficultyScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
