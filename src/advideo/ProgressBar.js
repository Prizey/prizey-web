import React, { useState, useLayoutEffect } from 'react'
import { LinearProgress } from '@material-ui/core'

export default ({ length }) => {
  const [progress, setProgress] = useState(0)
  const diff = 100 / length

  useLayoutEffect(() => {
    Array.from(document.getElementsByTagName('video')).map(video =>
      video.addEventListener('ended', () => {
        setProgress(progress + diff)
      }),
    )
  })

  return <LinearProgress variant="determinate" value={progress} />
}
