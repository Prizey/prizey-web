import React from 'react'
import renderer from 'react-test-renderer'
import { UserBalanceComponent, mapState } from '../UserBalance'

it('renders correctly', () => {
  const params = {
    user: { tickets: 10 },
  }
  const tree = renderer.create(<UserBalanceComponent {...params} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('get the user from croods state', () => {
  const user = { id: 1, tickets: 10 }
  const state = {
    auth: {
      currentUser: [{ state: { info: user } }],
    },
  }

  const result = mapState(state)
  expect(result).toEqual({ user })
})
