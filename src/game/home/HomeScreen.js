import React from 'react'
import { List } from 'croods'
import { Link } from '@reach/router'
import { Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Layout from 'design/Layout/Layout'
import UserBalance from 'design/UserBalance'
import ProfileLink from 'design/ProfileLink/ProfileLink'
import Roulette from '../Roulette'
import SpeedComponent from '../SpeedComponent'

const nextUrl = '/game'

const styles = theme => ({
  root: {
    display: 'block',
    marginTop: parseInt(theme.spacing.lg, 10) * -0.5,
    textDecoration: 'none',
  },
})

const ScreenWithRoullette = withStyles(styles)(
  ({ classes, speed, list, multiplier, currentUser, location }) => (
    <Layout
      leftIcon={<UserBalance />}
      rightIcon={
        currentUser ? (
          <ProfileLink />
        ) : (
          <Link to={'/sign-in'} style={{ textDecoration: 'none' }}>
            <Typography align="left" style={{ marginRight: '20px' }}>
              Login
            </Typography>
          </Link>
        )
      }
      location={location}
      currentUser={currentUser}
    >
      <Link to={nextUrl} className={classes.root}>
        <Roulette
          aria-label="roulette"
          speed={speed}
          data={list}
          multiplier={multiplier}
        />
        <br />
        <Typography align="center" variant="h5">
          Tap the screen, <br />
          win what you tap.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          aria-label="I want it"
        >
          PLAY FOR $1
        </Button>
      </Link>
    </Layout>
  ),
)

const ScreenWithSpeed = (
  difficulty,
  navigate,
  currentUser,
  location,
) => list => (
  <SpeedComponent
    render={settings => {
      const speed = settings[`${difficulty}CarouselSpeed`]

      return (
        <ScreenWithRoullette
          list={list}
          difficulty={difficulty}
          multiplier={settings.priceMultiplier}
          navigate={navigate}
          speed={speed}
          currentUser={currentUser}
          location={location}
        />
      )
    }}
  />
)

export default ({ currentUser, location, navigate, difficulty = 'medium' }) => (
  <List
    currentUser={currentUser}
    location={location}
    name="products"
    path={`/products/homepage`}
    render={ScreenWithSpeed(difficulty, navigate, currentUser, location)}
  />
)
