import React from 'react'
import renderer from 'react-test-renderer'
import RewardWithCroodsScreen from '../RewardScreen'

jest.mock('../../design/Layout/RegisterPageView')

jest.mock('croods', () => ({
  Info: ({ children, ...props }) => (
    <div {...props}>
      Info -{' '}
      {props.render({
        adDiamondsReward: 5,
      })}
    </div>
  ),
}))

it('renders correctly', () => {
  const props = {
    location: jest.fn(),
  }
  const tree = renderer.create(<RewardWithCroodsScreen {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})
