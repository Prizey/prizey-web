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
  ({ classes, settings, currentUser, location }) => (
    <Layout location={location} currentUser={currentUser}>
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

const RedirectUserWithoutBalance = ({ currentUser }) => (
  <SpeedComponent
    render={settings => {
      const userCanPlay = difficulties.filter(
        ({ difficulty }) =>
          currentUser.tickets >= settings[`${difficulty}TicketAmount`],
      )

      return userCanPlay.length ? (
        <ChooseDifficultyScreen settings={settings} currentUser={currentUser} />
      ) : (
        <Redirect to="/buy-diamonds" noThrow />
      )
    }}
  />
)

export default ({ currentUser }) =>
  currentUser ? (
    <RedirectUserWithoutBalance currentUser={currentUser} />
  ) : (
    <Redirect to="/sign-in" noThrow />
  )
