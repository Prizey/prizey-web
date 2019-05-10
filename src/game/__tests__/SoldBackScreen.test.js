import React from 'react'
import renderer from 'react-test-renderer'
import SoldBackScreen from '../SoldBackScreen'

jest.mock('design/UserBalance', () => () => null)

it('renders correctly', () => {
  const tree = renderer.create(<SoldBackScreen currentUser />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('redirects correctly', () => {
  const tree = renderer.create(<SoldBackScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('navigate to home when click on Go to home', () => {
  const params = {
    currentUser: true,
    navigate: jest.fn(),
  }
  const tree = renderer.create(<SoldBackScreen {...params} />).root

  tree.findByProps({ 'aria-label': 'Go to home' }).props.onClick()
  expect(params.navigate).toHaveBeenCalledWith('/')
})

it('navigate to game when click on Play Again', () => {
  const params = {
    currentUser: true,
    navigate: jest.fn(),
  }
  const tree = renderer.create(<SoldBackScreen {...params} />).root

  tree.findByProps({ 'aria-label': 'Play Again' }).props.onClick()
  expect(params.navigate).toHaveBeenCalledWith('/game')
})
