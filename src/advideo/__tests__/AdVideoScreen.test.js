import React from 'react'
import renderer, { act } from 'react-test-renderer'
import AdVideo, {
  afterCreate,
  handleEnd,
  vastReducer,
  autoplayTrick,
  setVideoProperties,
} from '../AdVideoScreen'

jest.mock('axios', () => ({
  get: () => Promise.resolve({ data: '' }),
}))
jest.mock('vast-xml-4', () => ({
  parse: () =>
    Promise.resolve({
      vast: {
        ad: [
          {
            inLine: {
              creatives: {
                creative: [{ linear: { duration: { _value: '00:00:30.0' } } }],
              },
            },
          },
        ],
      },
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
    const params = {
      dispatch: jest.fn(),
      settings: {
        vastTag: '',
      },
    }

    setVideoProperties(params)()
    setTimeout(() => {
      expect(params.dispatch).toHaveBeenCalledTimes(1)
    }, 100)
  })

  it('force the play if the browser block autoplay videos', () => {
    jest.useFakeTimers()

    const mockPlay = jest.fn()
    autoplayTrick({
      querySelector: () => ({
        play: () => {
          mockPlay()
          return Promise.reject()
        },
      }),
    })()

    jest.runOnlyPendingTimers()
    expect(mockPlay).toHaveBeenCalledTimes(1)
  })
})

describe('when finish one ad video', () => {
  it('load the next video', () => {
    const params = {
      current: 0,
      dispatch: jest.fn(),
      endParams: {
        amount: 3,
        create: jest.fn(),
        creating: false,
      },
      length: 3,
    }

    handleEnd(params)()
    expect(params.dispatch).toHaveBeenCalledTimes(1)
  })

  it('update the count on videos played', () => {
    const action = { type: 'fetchNextVast' }
    const state = {
      current: 1,
      vastXml: 'xml string',
    }

    expect(vastReducer(state, action)).toEqual({
      current: 2,
      vastXml: null,
    })

    expect(vastReducer(state, { type: '' })).toEqual(state)
  })
})

describe('when finish the ad video list', () => {
  it('call the create when finish the video', () => {
    const params = {
      current: 2,
      dispatch: jest.fn(),
      endParams: {
        amount: 3,
        create: jest.fn(),
        creating: false,
      },
      length: 3,
    }

    handleEnd(params)()
    expect(params.endParams.create).toHaveBeenCalledTimes(1)
  })

  it("do nothing if it's creating", () => {
    const params = {
      current: 2,
      dispatch: jest.fn(),
      endParams: {
        amount: 3,
        create: jest.fn(),
        creating: true,
      },
      length: 3,
    }

    handleEnd(params)()
    expect(params.endParams.create).not.toHaveBeenCalled()
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
