import React from 'react'
import renderer from 'react-test-renderer'
import ShippingInfo from '../ShippingInfo'

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

jest.mock('redux-form', () => ({
  Field: props => <div {...props}>Field</div>,
  reduxForm: () => Component => props => (
    <Component handleSubmit={() => jest.fn()} {...props} />
  ),
}))

it('renders correctly', () => {
  const params = {
    currentUser: true,
  }
  const tree = renderer.create(<ShippingInfo {...params} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('redirects correctly', () => {
  const params = {
    currentUser: false,
  }
  const tree = renderer.create(<ShippingInfo {...params} />).toJSON()
  expect(tree).toMatchSnapshot()
})
