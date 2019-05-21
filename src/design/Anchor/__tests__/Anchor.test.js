import React from 'react'
import renderer from 'react-test-renderer'
import Anchor from '../Anchor'

it('renders correctly', () => {
  const params = {
    user: { tickets: 10 },
  }
  const tree = renderer.create(<Anchor {...params} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('get the user from croods state', () => {
  // handleClick()()
})
