import React from 'react'
import renderer from 'react-test-renderer'
import ForgotSentScreen from '../ForgotSentScreen'

jest.mock('../../design/Layout/RegisterPageView')

it('renders correctly', () => {
  const tree = renderer.create(<ForgotSentScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})
