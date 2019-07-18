import React, { useLayoutEffect, useState } from 'react'
import get from 'lodash/get'
import sumBy from 'lodash/sumBy'
import VastPlayer from 'vast-player-react'
import VastXml from 'vast-xml-4'
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
      height: window.screen.height,
      width: window.screen.width,
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: theme.spacing.md,
  },
})

export const setVideoProperties = (settings, setVastXml, setDuration) => () => {
  axios.get(settings.vastTag).then(response => {
    const vastXml = response.data.replace('version="3.0"', 'version="4.0"')

    VastXml.parse(vastXml).then(vastJson => {
      const duration = sumBy(vastJson.vast.ad, adItem => {
        const time = get(
          adItem,
          'inLine.creatives.creative.0.linear.duration._value',
        )

        const timeParts = time.split(':')
        return (
          parseInt(timeParts[0], 10) * 3600 +
          parseInt(timeParts[1], 10) * 60 +
          parseInt(timeParts[2], 10)
        )
      })

      setDuration(duration)
      setVastXml(vastXml)
    })
  })
}

export const handleEnd = ({ creating, create, amount }) => () => {
  if (!creating) {
    create({ amount })
  }
}

export const AdVideoScreen = withStyles(styles)(
  ({ settings, classes, creating, create }) => {
    const adLength = 1
    const [vastXml, setVastXml] = useState(null)
    const [duration, setDuration] = useState(0)

    useLayoutEffect(setVideoProperties(settings, setVastXml, setDuration), [])

    return (
      <div className={classes.root}>
        {vastXml && (
          <VastPlayer
            height={window.screen.height}
            width={window.screen.width}
            vastXml={vastXml}
            videoOptions={{ disableControls: true }}
            onEnded={handleEnd({
              amount: settings.adDiamondsReward,
              create,
              creating,
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
