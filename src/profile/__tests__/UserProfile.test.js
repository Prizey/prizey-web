import React from 'react'
import renderer from 'react-test-renderer'
import UserProfileInfo from '../UserProfile'

jest.mock('croods', () => ({
  New: props => (
    <div {...props}>
      New -
      <div>
        render -
        {props.render({
          create: jest.fn(),
          creating: false,
          error: null,
        })}
      </div>
      <div>
        renderCreated - {props.renderCreated && props.renderCreated({ id: 1 })}
      </div>
    </div>
  ),
}))

jest.mock('formik', () => ({
  Field: props => <div {...props}>Field</div>,
  Form: ({ children, ...props }) => <div {...props}>Form - {children}</div>,
  Formik: props => (
    <div {...props}>Formik - {props.render({ foo: 'bar' })}</div>
  ),
}))

jest.mock('design/Snackbar/Snackbar', () => props => (
  <div name="snackbar" {...props}>
    Snackbar
  </div>
))

it('renders correctly', () => {
  const params = {
    currentUser: true,
    setCurrentUser: jest.fn(),
  }
  const tree = renderer.create(<UserProfileInfo {...params} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('redirects correctly', () => {
  const params = {
    currentUser: false,
  }
  const tree = renderer.create(<UserProfileInfo {...params} />).toJSON()
  expect(tree).toMatchSnapshot()
})
