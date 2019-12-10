import React from 'react'
import renderer from 'react-test-renderer'

import FreeGamePlayAgain, { mapState, getTag } from '../FreeGamePlayAgain'

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

jest.mock('design/AdminText/AdminText', () => props => (
  <div {...props}>
    AdminText -{' '}
    {props.render({
      freeGameButtonText: 'Foo free_game_button_text',
      freeGameButtonUrl: 'Foo free_game_button_url',
      freeGameMainText: 'Foo free_game_main_text',
    })}
  </div>
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

describe('When there is a pageId', () => {
  it('renders correctly', () => {
    const props = {
      currentUser: { id: 1, name: 'foo' },
      location: 'foo location',
      product: { image: 'https://foo.image', title: 'foo title' },
      pageId: 'foo',
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

describe('getTag', () => {
  it('works correctly', () => {
    const obj1 = { foo: 'foo' }
    const obj2 = { fooBar: 'foobar' }
    const tagName = 'foo'
    const tagSufix = 'bar'

    expect(getTag(obj1, tagName, tagSufix)).toBe('foo')
    expect(getTag(obj2, tagName, tagSufix)).toBe('foobar')
  })
})

describe('mapState', () => {
  it('works correctly', () => {
    const product = mapState({ basket: { product: 'foo' } })

    expect(product).toMatchObject({ product: 'foo' })
  })
})
