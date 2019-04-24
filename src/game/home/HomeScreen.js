import React from 'react'
import { connect } from 'react-redux'
import { List, Info } from 'croods'
import { Redirect, Link } from '@reach/router'
import { Button, Typography } from '@material-ui/core'

import { chooseProduct } from 'store/order/actions'

import Layout from 'design/Layout/Layout'
import Roulette from '../Roulette'

const nextUrl = '/game'

const InnerComponent = connect(
  null,
  { chooseProduct },
)(({ speed, list, multiplier }) => (
  <Layout>
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
    <br />
    <Link to={nextUrl} style={{ textDecoration: 'none' }}>
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
))

const SpeedComponent = (difficulty, navigate) => list => (
  <Info
    name="game"
    path="/game_setting"
    id={1}
    render={settings => {
      const speed = settings[`${difficulty}CarouselSpeed`]

      return (
        <InnerComponent
          list={list}
          difficulty={difficulty}
          multiplier={settings.priceMultiplier}
          navigate={navigate}
          speed={speed}
        />
      )
    }}
  />
)

export default ({ currentUser, navigate, difficulty = 'easy' }) =>
  currentUser ? (
    <List
      name="products"
      path={`/products/${difficulty}`}
      render={SpeedComponent(difficulty, navigate)}
    />
  ) : (
    <Redirect to={`/sign-in?next=/`} noThrow />
  )
