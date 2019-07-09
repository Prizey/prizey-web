import React from 'react'
import VastPlayer from 'vast-player-react'
// import VastXml from 'vast-xml-4'
import { LinearProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import GoBack from 'design/GoBack/GoBack'
import ProfileLink from 'design/ProfileLink/ProfileLink'
import SpeedComponent from 'game/SpeedComponent'

const styles = theme => ({
  appBar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
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
      background: theme.palette.advertising.background,
      height: window.screen.height,
      width: window.screen.width,
    },
  },
})

export const AdVideoScreen = withStyles(styles)(({ settings, classes }) => (
  <div className={classes.root}>
    <VastPlayer
      height={window.screen.height}
      width={window.screen.width}
      vastXml={settings.vastTag}
      videoOptions={{ disableControls: true }}
      onEnded={() => {
        // VastXml.parse(settings.vastTag).then(json => {
        //   console.log(json)
        // })
      }}
    />
    <div className={classes.appBar}>
      <GoBack />
      <ProfileLink />
    </div>

    <div className={classes.footerBar}>
      <LinearProgress variant="determinate" value={80} />
    </div>
  </div>
))

export default withStyles(styles)(props => (
  <SpeedComponent
    render={settings => <AdVideoScreen {...props} settings={settings} />}
  />
))
