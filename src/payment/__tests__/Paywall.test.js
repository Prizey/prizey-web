import React from 'react'
import renderer from 'react-test-renderer'
import Paywall from '../Paywall'

const mockList = [
  { id: 1, price: '10.0', ticketAmount: 10 },
  { id: 2, price: '25.0', ticketAmount: 25 },
  { id: 3, price: '50.0', ticketAmount: 50 },
]

jest.mock('../../design/Layout/RegisterPageView')

jest.mock('croods', () => ({
  List: props => (
    <div {...props}>
      {props.children} - Render: {props.render(mockList)}
    </div>
  ),
}))

it('renders correctly', () => {
  const tree = renderer.create(<Paywall currentUser />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('redirects correctly', () => {
  const tree = renderer.create(<Paywall />).toJSON()
  expect(tree).toMatchSnapshot()
})
