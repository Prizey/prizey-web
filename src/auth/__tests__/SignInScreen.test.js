import React from 'react'
import renderer from 'react-test-renderer'

import SignInScreen from '../SignInScreen'
import { FormBottom } from '../SignInScreen/SignInForm'

jest.mock('croods-auth', () => ({
  SignIn: props => (
    <div {...props}>
      New - <div>render - {props.render(props)}</div>
      <div>renderCreated - {props.renderCreated({ user: { id: 1 } })}</div>
    </div>
  ),
}))

jest.mock('seasoned-auth-forms-web', () => ({
  SignIn: props => <div {...props}>SignIn - {props.renderButton(props)}</div>,
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
  const tree = renderer.create(<SignInScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('redirect correctly', () => {
  const params = {
    currentUser: true,
    navigate: jest.fn(),
  }
  const tree = renderer.create(<SignInScreen {...params} />)
  tree.update()

  expect(params.navigate).toHaveBeenCalledTimes(1)
})
