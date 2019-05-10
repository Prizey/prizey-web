import React from 'react'
import renderer from 'react-test-renderer'
import { useFlash } from 'seasoned-flash'
import UserProfile from '../UserProfile'

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
        afterCreate - {props.afterCreate && props.afterCreate({ id: 1 })}
      </div>
    </div>
  ),
}))

jest.mock('../../design/Layout/RegisterPageView')

jest.mock('formik', () => ({
  Field: props => <div {...props}>Field</div>,
  Form: ({ children, ...props }) => <div {...props}>Form - {children}</div>,
  Formik: props => (
    <div {...props}>Formik - {props.render({ foo: 'bar' })}</div>
  ),
}))

jest.mock('../../auth/Logout', () => props => <div {...props}>Logout</div>)

const mockSuccess = jest.fn()

jest.mock('seasoned-flash', () => ({
  useFlash: () => ({
    success: mockSuccess,
  }),
}))

it('renders correctly', () => {
  const props = {
    currentUser: true,
    setCurrentUser: jest.fn(),
  }
  const tree = renderer.create(<UserProfile {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('redirects correctly', () => {
  const props = {
    currentUser: false,
  }
  const tree = renderer.create(<UserProfile {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('check if flashMessage is open', () => {
  const { success } = useFlash()
  const props = {
    currentUser: true,
    setCurrentUser: jest.fn(),
  }

  renderer.create(<UserProfile {...props} />)
  expect(success).toHaveBeenCalledWith('You updated your profile!')
})
