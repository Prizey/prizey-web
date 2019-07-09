import React from 'react'
import renderer, { act } from 'react-test-renderer'
import AdVideo, {
  afterCreate,
  handleEnd,
  setVideoLength,
} from '../AdVideoScreen'

jest.mock('vast-xml-4', () => ({
  parse: () =>
    Promise.resolve({
      vast: { ad: [] },
    }),
}))

jest.mock('croods', () => ({
  Info: ({ children, ...props }) => (
    <div {...props}>
      Info -{' '}
      {props.render({
        adDiamondsReward: 5,
        vastTag: '<VAST version="4.0"></Vast>',
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

  it('count the videos from vast tag', () => {
    const setAdLength = jest.fn()

    setVideoLength({ vastTag: '' }, setAdLength)()
    setTimeout(() => {
      expect(setAdLength).toHaveBeenCalledTimes(1)
    }, 100)
  })
})

describe('when finish the ad videos', () => {
  it('call the create when finish the video', () => {
    const params = {
      amount: 3,
      create: jest.fn(),
      creating: false,
    }

    handleEnd(params)()
    expect(params.create).toHaveBeenCalledTimes(1)
  })

  it("do nothing if it's creating", () => {
    const params = {
      amount: 3,
      create: jest.fn(),
      creating: true,
    }

    handleEnd(params)()
    expect(params.create).not.toHaveBeenCalled()
  })

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
