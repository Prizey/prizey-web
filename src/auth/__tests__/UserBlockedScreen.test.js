import React from 'react'
import renderer from 'react-test-renderer'
import UserBlockedScreen from '../UserBlockedScreen'

it('renders correctly', () => {
  const tree = renderer.create(<UserBlockedScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})
