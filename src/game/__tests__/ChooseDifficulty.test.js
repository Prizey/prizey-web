import React from 'react'
import renderer from 'react-test-renderer'
import ChooseDifficulty from '../ChooseDifficulty'

const mockList = [
  { id: 1, image: '/mocks/trump-mask.png', title: 'trump' },
  { id: 2, image: '/mocks/sweatshirt.png', title: 'sweatshirt' },
  { id: 3, image: '/mocks/shoe.png', title: 'shoe' },
]

jest.mock('croods', () => ({
  Info: ({ children, ...props }) => <div {...props}>Info - {children}</div>,
  List: props => (
    <div {...props}>
      {props.children} - Render: {props.render(mockList)}
      RenderLoading: {props.renderLoading()}
    </div>
  ),
  Provider: ({ children, ...props }) => (
    <div {...props}>Provider - {children}</div>
  ),
  createReducer: () => (state = {}) => state,
}))

it('renders correctly', () => {
  const tree = renderer.create(<ChooseDifficulty />).toJSON()
  expect(tree).toMatchSnapshot()
})
