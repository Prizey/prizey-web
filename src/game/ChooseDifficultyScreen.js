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

const ChooseDifficultyScreen = withStyles(styles)(({ classes }) => (
  <Layout>
    <Typography align="center" variant="h5">
      Pick a difficulty!
    </Typography>

    <div className={classes.buttonGroup}>
      <DifficultyButton
        productImage="/mocks/trump-mask.png"
        label="EASY"
        difficulty="easy"
        quantity={1}
        to="/game/easy"
      />

      <DifficultyButton
        productImage="/mocks/sweatshirt.png"
        label="MEDIUM"
        difficulty="medium"
        quantity={5}
        to="/game/medium"
      />

      <DifficultyButton
        productImage="/mocks/shoe.png"
        label="HARD"
        difficulty="hard"
        quantity={10}
        to="/game/hard"
      />
    </div>

    <Typography align="center">
      The harder difficulty, <br />
      the better the prizes.
    </Typography>
  </Layout>
))

export default ({ currentUser }) =>
  currentUser ? <ChooseDifficultyScreen /> : <Redirect to="sign-in" noThrow />
