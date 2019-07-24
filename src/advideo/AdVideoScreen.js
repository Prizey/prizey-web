import React, { useLayoutEffect, useReducer } from 'react'
import get from 'lodash/get'
import VastPlayer from 'vast-player-react'
import axios from 'axios'

import PlayCircleFilledWhite from '@material-ui/icons/PlayCircleFilledWhite'
import { Typography, Grid } from '@material-ui/core'
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
  icon: {
    height: 20,
    marginLeft: 5,
    marginTop: -5,
    width: 20,
  },
  playButton: {
    background: theme.palette.grey[500],
    borderRadius: '100%',
    cursor: 'pointer',
    height: 64,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 64,
    zIndex: 2,
  },
  playIcon: {
    cursor: 'pointer',
    fontSize: 64,
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

const triggerVideoPause = document => {
  const video = document.querySelector('video')
  if (video) {
    video.playsInline = true
    video.pause()
  }
}

export const handlePlayButton = (document, dispatch) => () => {
  const video = document.querySelector('video')
  if (video) {
    video.play().then(() => {
      dispatch({ type: 'playVideo' })
    })
  }
}

export const autoplayTrick = document => () => {
  // trick to the autoplay problem
  setTimeout(() => triggerVideoPause(document), 100)
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
      return {
        ...state,
        current: state.current + 1,
        vastXml: null,
      }

    case 'fetchNextVastSuccess':
      return { ...state, showPlay: true, vastXml: action.payload }

    case 'playVideo':
      return { ...state, showPlay: false }

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
      showPlay: false,
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

          <Grid
            container
            className={classes.title}
            justify="center"
            alignItems="center"
          >
            <Typography align="center" variant="body2" component="div">
              Watch {adLength} videos and get {settings.adDiamondsReward}{' '}
              diamonds
            </Typography>
            <img
              src="/icons/diamond.png"
              alt="diamond"
              className={classes.icon}
            />
          </Grid>
        </div>

        {state.showPlay && (
          <div className={classes.playButton}>
            <PlayCircleFilledWhite
              onClick={handlePlayButton(document, dispatch)}
              className={classes.playIcon}
            />
          </div>
        )}

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
