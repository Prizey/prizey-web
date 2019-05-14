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
  login: {
    align: 'left',
    marginRight: '20px',
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
  root: {
    display: 'block',
    marginTop: parseInt(theme.spacing.lg, 10) * -0.5,
    textDecoration: 'none',
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
    },
  },
  typography: {
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 0,
      marginTop: theme.spacing.xs,
    },
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
          <Link to={'/sign-in?next=/game'} style={{ textDecoration: 'none' }}>
            <Typography className={classes.login}>Login</Typography>
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
        <Typography align="center" variant="h5" className={classes.typography}>
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
