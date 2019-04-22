import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import GoBack from 'design/GoBack/GoBack'
import Layout from 'design/Layout/Layout'
import Caption from 'design/Caption/Caption'

import DifficultyButton from './DifficultyButton'

const styles = theme => ({
  buttonGroup: {
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
})

export default withStyles(styles)(({ classes, difficulty }) => (
  <Layout
    leftIcon={<GoBack to="/" />}
    caption={<Caption difficulty={difficulty} />}
  >
    <Typography align="center" variant="h5">
      Donald Trump Face Mask
    </Typography>

    <div className={classes.buttonGroup}>
      <DifficultyButton
        label="EASY"
        difficulty="easy"
        quantity={1}
        to="/game/easy"
      />

      <DifficultyButton
        label="MEDIUM"
        difficulty="medium"
        quantity={5}
        to="/game/medium"
      />

      <DifficultyButton
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
