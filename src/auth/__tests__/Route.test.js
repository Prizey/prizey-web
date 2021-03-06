import React from 'react'
import renderer from 'react-test-renderer'
import { navigate } from '@reach/router'

import Route, { getState } from '../Route'

jest.mock('react-redux', () => ({
  connect: () => Component => props => (
    <Component {...props} state={{ foo: 'bar' }} />
  ),
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

  describe('when have a custom authenticate method', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(
          <Route
            Component={Component}
            location={location}
            currentUser={{ id: 1, name: 'foo' }}
            authorize={state => state.foo === 'bar'}
          />,
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('redirects correctly', () => {
      renderer.create(
        <Route
          Component={Component}
          location={location}
          currentUser={{ blocked: false, id: 1, name: 'foo' }}
          authorize={state => state.foo !== 'bar'}
          unauthorized="/foo"
        />,
      )
      expect(navigate).toHaveBeenCalled()
    })
  })
})
