import React from 'react'
import { List, Info } from 'croods'

import GoBack from 'design/GoBack/GoBack'
import Caption from 'design/Caption/Caption'
import Layout from 'design/Layout/Layout'
import Roulette from './Roulette'

const InnerComponent = ({ speed, difficulty, list }) => (
  <Layout
    leftIcon={<GoBack to="/" />}
    caption={<Caption difficulty={difficulty} />}
  >
    <Roulette
      speed={speed}
      data={list}
      aria-label="roulette"
      onSelectItem={item =>
        // eslint-disable-next-line no-alert
        window.alert(`you tapped the item ${item.title}`)
      }
    />
  </Layout>
)

const SpeedComponent = difficulty => list => (
  <Info
    name="game"
    path="/game_setting"
    id={1}
    render={settings => {
      const speed = settings[`${difficulty}CarouselSpeed`]

      return InnerComponent({
        difficulty,
        list,
        multiplier: settings.priceMultiplier,
        speed,
      })
    }}
  />
)

export default ({ difficulty = 'easy' }) => (
  <List
    name="products"
    path={`/products/${difficulty}`}
    render={SpeedComponent(difficulty)}
  />
)
