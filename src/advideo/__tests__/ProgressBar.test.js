import { watchVideo } from '../ProgressBar'

describe('when component is mounted', () => {
  it('set the progress of videos played', () => {
    const params = {
      diff: 50,
      progress: 0,
      setProgress: jest.fn(),
      videos: [
        {
          addEventListener: (kind, callback) => callback(),
        },
      ],
    }
    watchVideo(params)()

    expect(params.setProgress).toHaveBeenCalledWith(50)
  })
})
