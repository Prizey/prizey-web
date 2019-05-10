import React from 'react'
import renderer from 'react-test-renderer'
import ReactGA from 'react-ga'
import RegisterPageView from '../RegisterPageView'

jest.mock('react-ga', () => ({
  initialize: jest.fn(),
  pageview: jest.fn(),
}))

it('renders correctly', () => {
  const tree = renderer
    .create(<RegisterPageView location={{ pathname: '/game' }} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
  expect(ReactGA.pageview).toHaveBeenCalledWith('/game')
})
