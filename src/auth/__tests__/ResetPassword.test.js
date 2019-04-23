import React from 'react'
import renderer from 'react-test-renderer'

import ResetPasswordScreen, {
  appendToken,
} from '../ResetPasswordScreen/ResetPasswordScreen'

jest.mock('croods-auth', () => ({
  ResetPassword: props => (
    <div {...props}>
      New - <div>render - {props.render(props)}</div>
      <div>renderCreated - {props.renderCreated({ user: { id: 1 } })}</div>
    </div>
  ),
}))

jest.mock('seasoned-auth-forms-web', () => ({
  NewPassword: props => (
    <div {...props}>NewPassword - {props.renderButton(props)}</div>
  ),
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

it('renders correctly', () => {
  const tree = renderer.create(<ResetPasswordScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('apppend a token on create', () => {
  const location = {
    search: 'reset_password_token=123123',
  }
  const data = {
    password: '123123',
  }
  const create = jest.fn()

  appendToken(create, location)(data)

  expect(create).toHaveBeenCalledWith({
    ...data,
    resetPasswordToken: '123123',
  })
})
