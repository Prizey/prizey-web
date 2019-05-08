import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Layout from 'design/Layout/Layout'
import { Redirect } from '@reach/router'

import UserBalance from 'design/UserBalance'
import ProfileLink from 'design/ProfileLink/ProfileLink'
import DifficultyButton from './DifficultyButton'
import SpeedComponent from './SpeedComponent'

const styles = theme => ({
  buttonGroup: {
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
})

const difficulties = [
  {
    difficulty: 'easy',
    label: 'EASY',
    to: '/game/easy',
  },
  {
    difficulty: 'medium',
    label: 'MEDIUM',
    to: '/game/medium',
  },
  {
    difficulty: 'hard',
    label: 'HARD',
    to: '/game/hard',
  },
]

const ChooseDifficultyScreen = withStyles(styles)(
  ({ navigate, classes, settings, currentUser, location, setCurrentUser }) => (
    <Layout
      location={location}
      currentUser={currentUser}
      leftIcon={<UserBalance />}
      rightIcon={<ProfileLink />}
    >
      <Typography align="center" variant="h5">
        Pick a difficulty!
      </Typography>

      <div className={classes.buttonGroup}>
        {difficulties.map(item => (
          <DifficultyButton
            key={item.difficulty}
            {...item}
            quantity={settings[`${item.difficulty}TicketAmount`]}
            availableTickets={currentUser.tickets}
            navigate={navigate}
            setCurrentUser={setCurrentUser}
          />
        ))}
      </div>

      <Typography align="center">
        The harder difficulty, <br />
        the better the prizes.
      </Typography>
    </Layout>
  ),
)

const RedirectUserWithoutBalance = ({
  navigate,
  currentUser,
  setCurrentUser,
  location,
}) => (
  <SpeedComponent
    render={settings => {
      const userCanPlay = difficulties.filter(
        ({ difficulty }) =>
          currentUser.tickets >= settings[`${difficulty}TicketAmount`],
      )

      return userCanPlay.length ? (
        <ChooseDifficultyScreen
          location={location}
          navigate={navigate}
          settings={settings}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      ) : (
        <Redirect to="/buy-diamonds" noThrow />
      )
    }}
  />
)

export default ({ navigate, setCurrentUser, currentUser, location }) =>
  currentUser ? (
    <RedirectUserWithoutBalance
      navigate={navigate}
      setCurrentUser={setCurrentUser}
      location={location}
      currentUser={currentUser}
    />
  ) : (
    <Redirect to="/sign-in" noThrow />
  )
