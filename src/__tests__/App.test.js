import React from 'react'
import renderer from 'react-test-renderer'
import App from '../App'

jest.mock('../Router', () => () => <div>Router</div>)
jest.mock('croods', () => ({
  Info: ({ children, ...props }) => <div {...props}>Info - {children}</div>,
  List: props => <div {...props}>{props.children}</div>,
  Provider: ({ children, ...props }) => (
    <div {...props}>
      Provider - {children}
      Loading - {props.renderLoading(props)}
      Error - {props.renderError(props)}
    </div>
  ),
  createReducer: () => (state = {}) => state,
}))

jest.mock('croods-auth', () => ({
  Auth: props => (
    <div {...props}>
      Auth - {props.render(props)} - {props.renderLoading()}
    </div>
  ),
  createReducer: () => (state = {}) => state,
  credentials: { foo: 'bar' },
}))

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})
