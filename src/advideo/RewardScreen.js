import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Link } from '@reach/router'

import Layout from 'design/Layout/Layout'
import GoBack from 'design/GoBack/GoBack'
import ProfileLink from 'design/ProfileLink/ProfileLink'
import SpeedComponent from 'game/SpeedComponent'

const styles = theme => ({
  icon: {
    height: 160,
    width: 160,
  },
  imgWrapper: {
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
})

export const RewardScreen = withStyles(styles)(
  ({ classes, location, settings }) => (
    <Layout
      location={location}
      leftIcon={<GoBack />}
      rightIcon={<ProfileLink />}
    >
      <Typography align="center" variant="h5">
        You got {settings.adDiamondsReward} <br /> diamonds!
      </Typography>

      <div className={classes.imgWrapper}>
        <img src="/icons/diamond.png" alt="diamond" className={classes.icon} />
      </div>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={classes.buttonReward}
        component={props => <Link to="/game" {...props} />}
      >
        LET’S PLAY!
      </Button>
    </Layout>
  ),
)

export default withStyles(styles)(props => (
  <SpeedComponent
    render={settings => <RewardScreen {...props} settings={settings} />}
  />
))
