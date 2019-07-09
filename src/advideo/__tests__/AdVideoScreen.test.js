import React from 'react'
import renderer, { act } from 'react-test-renderer'
import AdVideo, { afterCreate } from '../AdVideoScreen'

jest.mock('@material-ui/core/Dialog', () => ({ children, ...props }) => (
  <div {...props}>{children}</div>
))

jest.mock('croods', () => ({
  Info: ({ children, ...props }) => (
    <div {...props}>
      Info -{' '}
      {props.render({
        adDiamondsReward: 5,
        vastTag: null,
      })}
    </div>
  ),
  New: props => (
    <div {...props}>
      New - <div>render - {props.render(props)}</div>
    </div>
  ),
}))

describe('when component is mounted', () => {
  it('renders correctly', () => {
    act(() => {
      const params = {
        currentUser: { tickets: 10 },
        navigate: jest.fn(),
        setCurrentUser: jest.fn(),
      }
      const tree = renderer.create(<AdVideo {...params} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})

describe('when finish the ad videos', () => {
  it('call the navigate and set the user tickets', () => {
    const params = {
      currentUser: { id: 1, tickets: 10 },
      navigate: jest.fn(),
      setCurrentUser: jest.fn(),
    }

    afterCreate(params, 3)()
    expect(params.setCurrentUser).toHaveBeenCalledWith({
      id: 1,
      tickets: params.currentUser.tickets + 3,
    })
    expect(params.navigate).toHaveBeenCalledWith('/reward')
  })
})
