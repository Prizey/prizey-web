import React from 'react'
import renderer from 'react-test-renderer'
import FairnessScreen from '../FairnessScreen'

jest.mock('../../design/Layout/RegisterPageView')

jest.mock('croods', () => ({
  Info: ({ children, ...props }) => (
    <div {...props}>
      Info -{' '}
      {props.render({
        fairnessText: 'bla foo',
      })}
    </div>
  ),
}))

it('renders correctly', () => {
  const props = {
    currentUser: true,
    setCurrentUser: jest.fn(),
  }
  const tree = renderer.create(<FairnessScreen {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})
