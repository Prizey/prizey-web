import React, { useState, useEffect } from 'react'
import VastPlayer from 'vast-player-react'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'

// import Layout from 'design/Layout/Layout'
// import GoBack from 'design/GoBack/GoBack'
// import AdminText from 'design/AdminText/AdminText'

const styles = {
  root: {
    '& video': {
      height: 667,
      width: 375,
    },
    background: '#0099cc',
  },
}

const AdVideoScreen = withStyles(styles)(({ navigate, classes }) => {
  const [vast, setVast] = useState(null)

  useEffect(() => {
    axios('http://127.0.0.1:4567/vast.xml').then(result => {
      setVast(result.data)
    })
  })

  if (vast) {
    return (
      <div className={classes.root}>
        <VastPlayer
          height={667}
          width={375}
          vastXml={vast}
          videoOptions={{ disableControls: true }}
          onEnded={() => navigate('/')}
        />
      </div>
    )
  }

  return <p>Loading</p>
})

export default AdVideoScreen
