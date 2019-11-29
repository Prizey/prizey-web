import React from 'react'
import renderer from 'react-test-renderer'

import Index from '..'

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
