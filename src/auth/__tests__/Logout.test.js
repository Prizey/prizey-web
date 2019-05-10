import React from 'react'
import renderer from 'react-test-renderer'

import Logout from '../Logout'

jest.mock('croods-auth', () => ({
  SignOut: props => (
    <div {...props}>
      SignOut - {props.render({ destroy: jest.fn() })}-{props.renderDestroyed()}
    </div>
  ),
}))

jest.mock('@reach/router', () => ({
  Redirect: props => <div {...props}>Redirect</div>,
}))

it('renders correctly', () => {
  const tree = renderer.create(<Logout>Logout</Logout>).toJSON()
  expect(tree).toMatchSnapshot()
})
