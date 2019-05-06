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
    quantity: 10,
    to: '/game/hard',
  },
]

const ChooseDifficultyScreen = withStyles(styles)(({ classes }) => (
  <Layout>
    <Typography align="center" variant="h5">
      Pick a difficulty!
    </Typography>

    <div className={classes.buttonGroup}>
      {difficulties.map(item => (
        <DifficultyButton key={item.difficulty} {...item} />
      ))}
    </div>

    <Typography align="center">
      The harder difficulty, <br />
      the better the prizes.
    </Typography>
  </Layout>
))

const RedirectUserWithoutBalance = ({ currentUser }) => {
  const userCanPlay = difficulties.filter(
    difficulty => currentUser.tickets >= difficulty.quantity,
  )
  return userCanPlay.length ? (
    <ChooseDifficultyScreen />
  ) : (
    <Redirect to="/buy-diamonds" noThrow />
  )
}

export default ({ currentUser }) =>
  currentUser ? (
    <RedirectUserWithoutBalance currentUser={currentUser} />
  ) : (
    <Redirect to="/sign-in" noThrow />
  )
