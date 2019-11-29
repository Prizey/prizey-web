import React from 'react'
import renderer from 'react-test-renderer'
import { navigate } from '@reach/router'

import Video, { navigateTo, updateProgressBar } from '../Video'

jest.mock('react-player', () => props => (
  <div {...props}>react-player - {props.children}</div>
))

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}))

it('renders correctly', () => {
  const props = {
    videoEmbedUrl: 'Foo videoEmbedUrl',
    videoRedirectUrl: 'Foo videoRedirectUrl',
    videoText: 'Foo videoText',
  }
  const tree = renderer.create(<Video {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})

describe('navigateTo', () => {
  it('works correctly', () => {
    const videoRedirectUrl = 'https://foo-video-redirect-url.cc'

    navigateTo(videoRedirectUrl)()

    expect(navigate).toHaveBeenCalledWith(videoRedirectUrl)
  })
})

describe('updateProgressBar', () => {
  it('works correctly', () => {
    const setPlayed = jest.fn()

    updateProgressBar(setPlayed)({ played: 1 })

    expect(setPlayed).toHaveBeenCalledWith(100)
  })
})
