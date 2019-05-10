import React from 'react'
import renderer from 'react-test-renderer'

import ForgotPasswordScreen, {
  appendRedirect,
} from '../ForgotPasswordScreen/ForgotPasswordScreen'

jest.mock('croods-auth', () => ({
  ForgotPassword: props => (
    <div {...props}>
      New - <div>render - {props.render(props)}</div>
      <div>renderCreated - {props.renderCreated({ user: { id: 1 } })}</div>
    </div>
  ),
}))

jest.mock('seasoned-auth-forms-web', () => ({
  ForgotPassword: props => (
    <div {...props}>ForgotPassword - {props.renderButton(props)}</div>
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

jest.mock('../../design/Layout/RegisterPageView')

it('renders correctly', () => {
  const tree = renderer.create(<ForgotPasswordScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('apppend a token on create', () => {
  const data = {
    email: 'my@email.com',
  }
  const create = jest.fn()

  appendRedirect(create)(data)
  expect(create).toHaveBeenCalledWith({
    ...data,
    redirectUrl: `${process.env.REACT_APP_WEB_URL}/reset-password`,
  })
})
