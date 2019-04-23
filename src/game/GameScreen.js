import React from 'react'
import { connect } from 'react-redux'
import { List, Info } from 'croods'
import { Redirect } from '@reach/router'

import { chooseProduct } from 'store/order/actions'

import GoBack from 'design/GoBack/GoBack'
import Caption from 'design/Caption/Caption'
import Layout from 'design/Layout/Layout'
import Roulette from './Roulette'

const InnerComponent = connect(
  null,
  { chooseProduct },
)(({ speed, difficulty, list, multiplier, ...props }) => (
  <Layout
    leftIcon={<GoBack to="/" />}
    caption={<Caption difficulty={difficulty} />}
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
    <Redirect to={`/sign-in?next=/game/${difficulty}`} noThrow />
  )
