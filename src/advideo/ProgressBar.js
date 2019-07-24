import React, { useState } from 'react'
import { LinearProgress } from '@material-ui/core'
import { useInterval } from 'seasoned-components'

export const updateProgress = ({
  duration,
  paused,
  progress,
  setProgress,
}) => () => {
  !paused && setProgress(progress + 50 / duration)
}

export default ({ duration, paused }) => {
  const [progress, setProgress] = useState(0)
  useInterval(updateProgress({ duration, paused, progress, setProgress }), 500)

  return <LinearProgress variant="determinate" value={progress} />
}
