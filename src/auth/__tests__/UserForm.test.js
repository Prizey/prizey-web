import React from 'react'
import renderer from 'react-test-renderer'
import UserForm from '../UserForm'

jest.mock('redux-form', () => ({
  Field: props => <div {...props}>Field</div>,
  reduxForm: () => Component => props => (
    <Component handleSubmit={() => jest.fn()} {...props} />
  ),
}))

it('renders correctly', () => {
  const params = {
    onSubmit: jest.fn(),
    renderButton: () => <button>Button</button>,
  }
  const tree = renderer.create(<UserForm {...params} />).toJSON()
  expect(tree).toMatchSnapshot()
})
