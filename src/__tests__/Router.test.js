import React from 'react'
import renderer from 'react-test-renderer'
import Router from '../Router'

jest.mock('@reach/router', () => ({
  Router: () => <div>Router</div>,
}))

it('renders correctly', () => {
  const tree = renderer.create(<Router />).toJSON()
  expect(tree).toMatchSnapshot()
})
