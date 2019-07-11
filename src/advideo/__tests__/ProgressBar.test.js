import { updateProgress } from '../ProgressBar'

describe('when component is mounted', () => {
  it('set the progress of videos played', () => {
    const params = {
      duration: 50,
      progress: 0,
      setProgress: jest.fn(),
    }
    updateProgress(params)()

    expect(params.setProgress).toHaveBeenCalledWith(1)
  })
})
