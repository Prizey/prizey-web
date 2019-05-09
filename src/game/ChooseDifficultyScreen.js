import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Layout from 'design/Layout/Layout'
import { Redirect } from '@reach/router'

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
  ({ navigate, classes, settings, currentUser, setCurrentUser }) => (
    <Layout>
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
}) => (
  <SpeedComponent
    render={settings => {
      const userCanPlay = difficulties.filter(
        ({ difficulty }) =>
          currentUser.tickets >= settings[`${difficulty}TicketAmount`],
      )

      return userCanPlay.length ? (
        <ChooseDifficultyScreen
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

export default ({ navigate, setCurrentUser, currentUser }) =>
  currentUser ? (
    <RedirectUserWithoutBalance
      navigate={navigate}
      setCurrentUser={setCurrentUser}
      currentUser={currentUser}
    />
  ) : (
    <Redirect to="/sign-in" noThrow />
  )
