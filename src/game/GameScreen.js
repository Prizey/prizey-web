import React from 'react'
import { connect } from 'react-redux'
import { List } from 'croods'
import { Redirect } from '@reach/router'
import { Typography } from '@material-ui/core'

import { chooseProduct } from 'store/basket/actions'

import UserBalance from 'design/UserBalance'
import Caption from 'design/Caption/Caption'
import Layout from 'design/Layout/Layout'
import Roulette from './Roulette'
import SpeedComponent from './SpeedComponent'

const GameComponent = connect(
  null,
  { chooseProduct },
)(
  ({
    speed,
    difficulty,
    list,
    multiplier,
    currentUser,
    location,
    ...props
  }) => (
    <Layout
      leftIcon={<UserBalance />}
      caption={<Caption difficulty={difficulty} />}
      location={location}
      currentUser={currentUser}
    >
      <Roulette
        aria-label="roulette"
        speed={speed}
        data={list}
        multiplier={multiplier}
        onSelectItem={item => {
          props.chooseProduct(item)
          props.navigate(`/game/${difficulty}/claim`)
        }}
      />
      <br />
      <Typography align="center" variant="body2" color="textSecondary">
        Tap the screen, <br />
        win what you tap.
      </Typography>
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
        <GameComponent
          location={location}
          currentUser={currentUser}
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

export default ({ currentUser, location, navigate, difficulty = 'easy' }) =>
  currentUser ? (
    <List
      name="products"
      path={`/products/${difficulty}`}
      render={ScreenWithSpeed(difficulty, navigate, currentUser, location)}
    />
  ) : (
    <Redirect to={`/sign-in?next=/game/${difficulty}`} noThrow />
  )
