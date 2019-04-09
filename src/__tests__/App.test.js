import React from 'react'
import renderer from 'react-test-renderer'
import App from '../App'

jest.mock('croods', () => ({
  Info: ({ children, ...props }) => <div {...props}>Info - {children}</div>,
  Provider: ({ children, ...props }) => (
    <div {...props}>Provider - {children}</div>
  ),
  createReducer: () => (state = {}) => state,
}))

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})
