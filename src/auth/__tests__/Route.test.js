import React from 'react'
import renderer from 'react-test-renderer'
import { navigate } from '@reach/router'

import Route, { getState } from '../Route'

jest.mock('react-redux', () => ({
  connect: () => Component => props => <Component {...props} state={{}} />,
}))

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}))
window.scrollTo = jest.fn()

const Component = () => <div>Foo bar foo</div>
const location = { pathname: 'fooURL' }

it('test the get of state', () => {
  const state = { basket: {} }
  expect(getState(state)).toEqual({
    state,
  })
})

describe('without authenticated user', () => {
  it('redirect user to signIn route', () => {
    renderer.create(<Route Component={Component} location={location} />)

    expect(navigate).toHaveBeenCalledWith(`/sign-in?next=${location.pathname}`)
  })
})

describe('whith currentUser', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Route
          Component={Component}
          location={location}
          currentUser={{ id: 1, name: 'foo' }}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('redirect to blocked when the currentUser is blocked', () => {
    renderer.create(
      <Route
        Component={Component}
        location={location}
        currentUser={{ blocked: true, id: 1, name: 'foo' }}
      />,
    )
    expect(navigate).toHaveBeenCalledWith('/blocked')
  })

  it('the page should be scrolled to the top', () => {
    renderer.create(
      <Route
        Component={Component}
        location={location}
        currentUser={{ id: 1, name: 'foo' }}
      />,
    )
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
