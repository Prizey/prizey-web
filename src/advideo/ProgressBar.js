import React, { useState, useLayoutEffect } from 'react'
import { LinearProgress } from '@material-ui/core'

export const watchVideo = ({ videos, progress, setProgress, diff }) => () => {
  Array.from(videos).map(video =>
    video.addEventListener('ended', () => {
      setProgress(progress + diff)
    }),
  )
}

export default ({ length }) => {
  const [progress, setProgress] = useState(0)
  const diff = 100 / length

  useLayoutEffect(
    watchVideo({
      diff,
      progress,
      setProgress,
      videos: document.getElementsByTagName('video'),
    }),
  )

  return <LinearProgress variant="determinate" value={progress} />
}
