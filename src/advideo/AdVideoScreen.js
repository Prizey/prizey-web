import React, { useLayoutEffect, useReducer } from 'react'
import get from 'lodash/get'
import VastPlayer from 'vast-player-react'
import axios from 'axios'

import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import GoBack from 'design/GoBack/GoBack'
import ProfileLink from 'design/ProfileLink/ProfileLink'
import SpeedComponent from 'game/SpeedComponent'
import TransactionComponent from 'game/TransactionComponent'

import ProgressBar from './ProgressBar'

const styles = theme => ({
  appBar: {
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
    position: 'relative',
    zIndex: 1,
  },
  footerBar: {
    bottom: 0,
    left: 0,
    paddingBottom: theme.spacing.lg,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    position: 'absolute',
    right: 0,
  },
  root: {
    '& video': {
      background: get(theme.palette, 'advertising.background'),
      height: window.innerHeight,
      width: window.innerWidth,
    },
    height: '100vh',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: theme.spacing.md,
  },
})

export const setVideoProperties = ({ dispatch, settings }) => () => {
  axios.get(settings.vastTag).then(response => {
    const vastXml = response.data.replace('version="3.0"', 'version="4.0"')
    dispatch({ payload: vastXml, type: 'fetchNextVastSuccess' })
  })
}

const triggerVideoPlay = document => {
  const video = document.querySelector('video')
  if (video) {
    const promise = video.play()

    if (promise !== undefined) {
      promise.catch(() => {
        // Show something in the UI that the video is muted
        video.muted = true
        video.play()
      })
    }
  }
}

export const autoplayTrick = document => () => {
  // trick to the autoplay problem
  setTimeout(() => triggerVideoPlay(document), 100)
}

export const handleEnd = ({ current, length, dispatch, endParams }) => () => {
  if (current + 1 >= length) {
    const { creating, create, amount } = endParams
    if (!creating) {
      create({ amount })
    }
  } else {
    dispatch({ type: 'fetchNextVast' })
  }
}

export const vastReducer = (state, action) => {
  switch (action.type) {
    case 'fetchNextVast':
      return { ...state, current: state.current + 1, vastXml: null }

    case 'fetchNextVastSuccess':
      return { ...state, vastXml: action.payload }

    default:
      return state
  }
}

export const AdVideoScreen = withStyles(styles)(
  ({ settings, classes, creating, create }) => {
    const adLength = settings.videoAdsForReward || 6
    const duration = adLength * 30

    const [state, dispatch] = useReducer(vastReducer, {
      current: 0,
      vastXml: null,
    })

    useLayoutEffect(setVideoProperties({ dispatch, settings }), [state.current])
    useLayoutEffect(autoplayTrick(document), [state.current, state.vastXml])

    return (
      <div className={classes.root}>
        {state.vastXml && (
          <VastPlayer
            height={window.innerHeight}
            width={window.innerWidth}
            vastXml={state.vastXml}
            videoOptions={{ disableControls: true }}
            onEnded={handleEnd({
              current: state.current,
              dispatch,
              endParams: {
                amount: settings.adDiamondsReward,
                create,
                creating,
              },
              length: adLength,
            })}
          />
        )}
        <div className={classes.appBar}>
          <div className={classes.row}>
            <GoBack />
            <ProfileLink />
          </div>

          <Typography align="center" className={classes.title} variant="body2">
            watch {adLength} ads and get {settings.adDiamondsReward} diamonds.
          </Typography>
        </div>

        <div className={classes.footerBar}>
          <ProgressBar duration={duration} />
        </div>
      </div>
    )
  },
)

export const afterCreate = (
  { navigate, currentUser, setCurrentUser },
  amount,
) => () => {
  setCurrentUser({
    ...currentUser,
    tickets: currentUser.tickets + amount,
  })
  navigate('/reward')
}

export default withStyles(styles)(props => (
  <SpeedComponent
    render={settings => (
      <TransactionComponent
        afterCreate={afterCreate(props, settings.adDiamondsReward)}
        render={renderProps => (
          <AdVideoScreen {...renderProps} {...props} settings={settings} />
        )}
      />
    )}
  />
))
