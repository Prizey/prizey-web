import React from 'react'
import renderer from 'react-test-renderer'
import UserBlockedScreen from '../UserBlockedScreen'

jest.mock('../../design/Layout/RegisterPageView')

it('renders correctly', () => {
  const tree = renderer.create(<UserBlockedScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})
