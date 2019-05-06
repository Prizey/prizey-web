import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Layout from 'design/Layout/Layout'
import { Redirect } from '@reach/router'

import DifficultyButton from './DifficultyButton'

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
    quantity: 1,
    to: '/game/easy',
  },
  {
    difficulty: 'medium',
    label: 'MEDIUM',
    quantity: 5,
    to: '/game/medium',
  },
  {
    difficulty: 'hard',
    label: 'HARD',
    quantity: 100,
    to: '/game/hard',
  },
]

const ChooseDifficultyScreen = withStyles(styles)(
  ({ classes, currentUser }) => (
    <Layout>
      <Typography align="center" variant="h5">
        Pick a difficulty!
      </Typography>

      <div className={classes.buttonGroup}>
        {difficulties.map(item => (
          <DifficultyButton
            key={item.difficulty}
            {...item}
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

export default ({ currentUser }) =>
  currentUser ? (
    <ChooseDifficultyScreen currentUser={currentUser} />
  ) : (
    <Redirect to="/sign-in" noThrow />
  )
