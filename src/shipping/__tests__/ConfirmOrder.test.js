import React from 'react'
import renderer from 'react-test-renderer'
import ConfirmOrder, {
  ConfirmOrderComponent,
  handleCancel,
  handleShipIt,
  handleAfterCreate,
  mapState,
} from '../ConfirmOrder'

jest.mock('react-redux', () => ({
  connect: () => Component => props => (
    <Component {...props} product={{ id: 1 }} />
  ),
}))

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

it('renders correctly', () => {
  const params = {
    currentUser: {
      address: '1# street',
      city: 'porto alegre',
      clothingSize: 'M',
      fullname: 'john john',
      shoeSize: '42',
      stateProvinceRegion: 'RS',
      zipCode: '90000-000',
    },
  }

  const tree = renderer.create(<ConfirmOrder {...params} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders Component correctly', () => {
  const params = {
    currentUser: {
      address: '1# street',
      city: 'porto alegre',
      clothingSize: 'M',
      fullname: 'john john',
      shoeSize: '42',
      stateProvinceRegion: 'RS',
      zipCode: '90000-000',
    },
  }

  const tree = renderer.create(<ConfirmOrderComponent {...params} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('redirects correctly', () => {
  const tree = renderer.create(<ConfirmOrderComponent />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('check cancel action', () => {
  const navigate = jest.fn()
  handleCancel(navigate)()

  expect(navigate).toHaveBeenCalledWith('/shipping-info')
})

it('check cancel action', () => {
  const navigate = jest.fn()
  handleAfterCreate(navigate)()

  expect(navigate).toHaveBeenCalledWith('/shipping-confirmation')
})

it('check shipIt action', () => {
  const create = jest.fn()
  const product = { id: 1 }

  handleShipIt(product, create)()
  expect(create).toHaveBeenCalledWith({ productId: product.id })
})

it('map the state to props', () => {
  const basket = {
    product: { image: '/mock/trump-mask.png', title: 'Trump mask' },
  }

  expect(mapState({ basket })).toEqual({ product: basket.product })
})
