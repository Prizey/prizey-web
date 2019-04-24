import React from 'react'
import renderer, { act } from 'react-test-renderer'
import Roulette, { getItemSpeed, enterTransition } from '../Roulette'

jest.useFakeTimers()

const mockList = [
  { id: 1, image: '/mocks/trump-mask.png', price: 10, title: 'trump' },
  { id: 2, image: '/mocks/sweatshirt.png', price: 10, title: 'sweatshirt' },
  { id: 3, image: '/mocks/shoe.png', price: 10, title: 'shoe' },
]

it('gets the correct item speed', () => {
  const speed = getItemSpeed(10, 1000, 1)
  expect(speed).toEqual(1000)
})

it('gets the correct transition information', () => {
  const transition = enterTransition({ speed: 250 })
  expect(transition).toEqual({
    opacity: { duration: 200 },
    x: { duration: 10 },
  })
})

it('renders correctly', () => {
  const tree = renderer
    .create(<Roulette speed={2000} data={mockList} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('the tap works', () => {
  const onTap = jest.fn()
  const tree = renderer.create(
    <Roulette speed={250} data={mockList} onSelectItem={onTap} />,
  ).root

  tree.findByProps({ 'aria-label': 'rouletteItem-0' }).props.onMouseDown()

  expect(onTap).toHaveBeenCalledWith(mockList[0])
})

it('go to the next image', () => {
  const tree = renderer.create(<Roulette speed={10000} data={mockList} />).root

  act(() => {
    jest.runOnlyPendingTimers()
  })
  expect(tree.findByProps({ pose: 'enter' }).props.src).toEqual(
    mockList[1].image,
  )
})
