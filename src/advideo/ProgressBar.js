import React, { useState, useLayoutEffect } from 'react'
import { LinearProgress } from '@material-ui/core'

export const watchVideo = ({ videos, setProgress }) => () => {
  Array.from(videos).map(video =>
    video.addEventListener('progress', evt => {
      const { target } = evt
      const currentPercent = (target.currentTime * 100) / target.duration

      setProgress(currentPercent)
    }),
  )
}

export default ({ length }) => {
  const [progress, setProgress] = useState(0)

  useLayoutEffect(
    watchVideo({
      length,
      setProgress,
      videos: document.getElementsByTagName('video'),
    }),
  )

  return <LinearProgress variant="determinate" value={progress} />
}
