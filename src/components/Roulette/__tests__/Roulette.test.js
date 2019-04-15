import React from 'react'
import renderer, { act } from 'react-test-renderer'
import Roulette from '../Roulette'

jest.useFakeTimers()

const mockList = [
  '/mocks/trump-mask.png',
  '/mocks/sweatshirt.png',
  '/mocks/shoe.png',
]

it('renders correctly', () => {
  const tree = renderer
    .create(<Roulette speed={250} data={mockList} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('the tap works', () => {
  const onTap = jest.fn()
  const tree = renderer.create(
    <Roulette speed={250} data={mockList} onSelectItem={onTap} />,
  ).root

  tree.findByProps({ pose: 'enter' }).props.onClick()

  expect(onTap).toHaveBeenCalledWith(mockList[0])
})

it('go to the next image', () => {
  const tree = renderer.create(<Roulette speed={10000} data={mockList} />).root

  act(() => {
    jest.runOnlyPendingTimers()
  })
  expect(tree.findByProps({ pose: 'enter' }).props.src).toEqual(mockList[0])
})