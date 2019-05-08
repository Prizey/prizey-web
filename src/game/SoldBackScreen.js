import React from 'react'
import { Redirect } from '@reach/router'
import { Button, Typography } from '@material-ui/core'

import Layout from 'design/Layout/Layout'

const SoldBackComponent = ({ navigate, currentUser, location }) => (
  <Layout location={location} currentUser={currentUser}>
    <Typography align="center" variant="h5">
      Congrats! You sold the product for 3 diamonds.
    </Typography>
    <br />
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      aria-label="Go to home"
      onClick={() => {
        navigate('/')
      }}
    >
      Go to home
    </Button>

    <Button
      variant="contained"
      color="primary"
      fullWidth
      aria-label="Play Again"
      onClick={() => {
        navigate('/game')
      }}
    >
      Play Again
    </Button>
  </Layout>
)

export default ({ currentUser, ...props }) =>
  currentUser ? (
    <SoldBackComponent {...props} />
  ) : (
    <Redirect to="/sign-in?next=/sold-back" noThrow />
  )
