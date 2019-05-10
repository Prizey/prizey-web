import React from 'react'
import renderer from 'react-test-renderer'
import ChooseDifficultyScreen from '../ChooseDifficultyScreen'

const mockList = [
  { id: 1, image: '/mocks/trump-mask.png', title: 'trump' },
  { id: 2, image: '/mocks/sweatshirt.png', title: 'sweatshirt' },
  { id: 3, image: '/mocks/shoe.png', title: 'shoe' },
]

jest.mock('../../design/Layout/RegisterPageView')

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
