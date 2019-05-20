import React from 'react'
import renderer from 'react-test-renderer'
import TermsOfService from '../TermsOfServiceScreen'

jest.mock('../../design/Layout/RegisterPageView')

jest.mock('croods', () => ({
  Info: ({ children, ...props }) => (
    <div {...props}>
      Info -{' '}
      {props.render({
        termsOfService: 'bla foo',
      })}
    </div>
  ),
}))

it('renders correctly', () => {
  const props = {
    currentUser: true,
    setCurrentUser: jest.fn(),
  }
  const tree = renderer.create(<TermsOfService {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})
