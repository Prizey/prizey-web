import React from 'react'
import renderer from 'react-test-renderer'
import GameDownScreen from '../GameDownScreen'

jest.mock('../../design/Layout/RegisterPageView')

it('renders correctly', () => {
  const tree = renderer.create(<GameDownScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})
