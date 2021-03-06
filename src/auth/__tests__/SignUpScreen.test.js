import React from 'react'
import renderer from 'react-test-renderer'

import SignUpScreen from '../SignUpScreen'
import { FormBottom } from '../SignUpScreen/SignUpForm'

jest.mock('../../design/Layout/RegisterPageView')

jest.mock('croods-auth', () => ({
  SignUp: props => (
    <div {...props}>
      New - <div>render - {props.render(props)}</div>
      <div>renderCreated - {props.renderCreated({ user: { id: 1 } })}</div>
    </div>
  ),
}))

jest.mock('seasoned-auth-forms-web', () => ({
  SignUp: props => <div {...props}>SignUp - {props.renderButton(props)}</div>,
}))

jest.mock('@reach/router', () => ({
  Link: props => <div {...props}>Link - {props.children}</div>,
  Redirect: props => <div {...props}>Redirect - {props.children}</div>,
}))

jest.mock('croods', () => ({
  New: props => (
    <div {...props}>
      New - <div>render - {props.render(props)}</div>
      <div>renderCreated - {props.renderCreated({ id: 1 })}</div>
    </div>
  ),
}))

it('renders the form correctly', () => {
  const tree = renderer.create(<FormBottom />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly', () => {
  const tree = renderer.create(<SignUpScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('redirect correctly', () => {
  const params = {
    currentUser: true,
  }
  const tree = renderer.create(<SignUpScreen {...params} />).toJSON()
  expect(tree).toMatchSnapshot()
})
