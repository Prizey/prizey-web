import React from 'react'
import renderer from 'react-test-renderer'

import FreeGamePlayAgain, { mapState } from '../FreeGamePlayAgain'

jest.mock('react-redux', () => ({
  connect: () => Component => props => (
    <Component {...props} state={{ foo: 'bar' }} />
  ),
}))

jest.mock('design/UserBalance', () => props => (
  <div {...props}>UserBalance - {props.children}</div>
))

jest.mock('design/Layout/Layout', () => props => (
  <div {...props}>Layout - {props.children}</div>
))

jest.mock('design/ProductImage', () => props => (
  <div {...props}>ProductImage - {props.children}</div>
))

jest.mock('design/Caption/Caption', () => props => (
  <div {...props}>Caption - {props.children}</div>
))

describe('When there is a product', () => {
  it('renders correctly', () => {
    const props = {
      currentUser: { id: 1, name: 'foo' },
      location: 'foo location',
      product: { image: 'https://foo.image', title: 'foo title' },
    }
    const tree = renderer.create(<FreeGamePlayAgain {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('When there is no product', () => {
  it('renders correctly', () => {
    const props = {
      currentUser: { id: 1, name: 'foo' },
      location: 'foo location',
    }
    const tree = renderer.create(<FreeGamePlayAgain {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('mapState', () => {
  it('works correctly', () => {
    const product = mapState({ basket: { product: 'foo' } })

    expect(product).toMatchObject({ product: 'foo' })
  })
})
