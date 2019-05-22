import React from 'react'
import renderer from 'react-test-renderer'
import PrivacyPolicy from '../PrivacyPolicy'

jest.mock('../../design/Layout/RegisterPageView')

jest.mock('croods', () => ({
  Info: ({ children, ...props }) => (
    <div {...props}>
      Info -{' '}
      {props.render({
        pivacyPolicy: 'bla foo',
      })}
    </div>
  ),
}))

it('renders correctly', () => {
  const props = {
    currentUser: true,
    setCurrentUser: jest.fn(),
  }
  const tree = renderer.create(<PrivacyPolicy {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})
