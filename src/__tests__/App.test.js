import React from 'react'
import renderer from 'react-test-renderer'
import { navigate } from '@reach/router'
import App, { checkStatus } from '../App'

jest.mock('../Router', () => () => <div>Router</div>)

jest.mock('croods', () => ({
  Info: ({ children, ...props }) => <div {...props}>Info - {children}</div>,
  List: props => <div {...props}>{props.children}</div>,
  Provider: ({ children, ...props }) => (
    <div {...props}>
      Provider - {children}
      Loading - {props.renderLoading(props)}
      Error - {props.renderError(props)}
      AfterFailure - {props.afterFailure({ status: 200 })}
    </div>
  ),
  createReducer: () => (state = {}) => state,
}))

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
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

const OLD_ENV = process.env

beforeEach(() => {
  jest.resetModules()
  process.env = { ...OLD_ENV, REACT_APP_API_URL: 'https://api.foobar.com' }
  delete process.env.NODE_ENV
})

afterEach(() => {
  process.env = OLD_ENV
})

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('test checkStatus with 503', () => {
  const response = { status: 503 }
  checkStatus(response)
  expect(navigate).toHaveBeenCalledWith(`/game-down`)
})

it('test checkStatus with 403', () => {
  const response = { status: 403 }
  checkStatus(response)
  expect(navigate).toHaveBeenCalledWith(`/blocked`)
})
