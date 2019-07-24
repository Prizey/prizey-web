import { updateProgress } from '../ProgressBar'

describe('when component is mounted', () => {
  describe('and the video is playing', () => {
    it('set the progress of videos played', () => {
      const params = {
        duration: 50,
        paused: false,
        progress: 0,
        setProgress: jest.fn(),
      }
      updateProgress(params)()

      expect(params.setProgress).toHaveBeenCalledWith(1)
    })
  })

  describe('and the video is paused', () => {
    it('DO NOT set the progress of videos played', () => {
      const params = {
        duration: 50,
        paused: true,
        progress: 0,
        setProgress: jest.fn(),
      }
      updateProgress(params)()

      expect(params.setProgress).not.toHaveBeenCalled()
    })
  })
})
