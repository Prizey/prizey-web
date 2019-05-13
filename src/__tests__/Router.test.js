import React from 'react'
import renderer from 'react-test-renderer'
import Router, { authorizeGameFlow, authorizeShippingFlow } from '../Router'

jest.mock('@reach/router', () => ({
  Router: () => <div>Router</div>,
}))

it('renders correctly', () => {
  const tree = renderer.create(<Router />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('test the check for paid ticket, to start the game', () => {
  const success = authorizeGameFlow({ basket: { paid: true } })
  const failure = authorizeGameFlow({ basket: { paid: false } })
  expect(success).toBeTruthy()
  expect(failure).toBeFalsy()
})

it('test the check for selected product, to start the shipping', () => {
  const success = authorizeShippingFlow({
    basket: { paid: true, product: { id: 1 } },
  })
  const failure = authorizeShippingFlow({
    basket: { paid: true, product: null },
  })
  expect(success).toBeTruthy()
  expect(failure).toBeFalsy()
})
