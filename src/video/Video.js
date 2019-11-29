import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { navigate } from '@reach/router'
import styles from './styles'

export const navigateTo = videoRedirectUrl => () => navigate(videoRedirectUrl)

export const updateProgressBar = setPlayed => ({ played }) =>
  setPlayed(played * 100)

const Video = ({ videoEmbedUrl, videoRedirectUrl, videoText }) => {
  const [played, setPlayed] = useState(0)

  return (
    <div style={styles.app}>
      <div style={styles.wrapper}>
        <ReactPlayer
          style={styles.player}
          url={videoEmbedUrl}
          playing
          onEnded={navigateTo(videoRedirectUrl)}
          onProgress={updateProgressBar(setPlayed)}
          width="100%"
          height="100%"
        />
        <div style={styles.text}>{videoText}</div>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progress, width: `${played}%` }} />
        </div>
      </div>
    </div>
  )
}

export default Video
