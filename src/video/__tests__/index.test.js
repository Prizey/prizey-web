import React from 'react'
import renderer from 'react-test-renderer'

import Index, { getTag } from '..'

jest.mock('design/AdminText/AdminText', () => props => (
  <div {...props}>
    AdminText -{' '}
    {props.render({
      videoEmbedUrl: 'Foo videoEmbedUrl',
      videoRedirectUrl: 'Foo videoRedirectUrl',
      videoText: 'Foo videoText',
    })}
  </div>
))

jest.mock('.././Video', () => props => (
  <div {...props}>Video - {props.children}</div>
))

it('renders correctly', () => {
  const tree = renderer.create(<Index />).toJSON()
  expect(tree).toMatchSnapshot()
})

describe('when the page is created by adminTexts', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Index pageId="foobar" />).toJSON()
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
