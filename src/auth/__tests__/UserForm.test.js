import React from 'react'
import renderer from 'react-test-renderer'
import UserForm from '../UserForm'

jest.mock('formik', () => ({
  Field: props => <div {...props}>Field - {props.validate('')}</div>,
  Form: ({ children, ...props }) => <div {...props}>Form - {children}</div>,
  Formik: props => (
    <div {...props}>Formik - {props.render({ foo: 'bar' })}</div>
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
