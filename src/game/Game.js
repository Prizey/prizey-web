import React from 'react'
import { List } from 'croods'

import GoBack from 'components/GoBack/GoBack'
import Caption from 'components/Caption/Caption'
import Layout from 'components/Layout/Layout'
import Roulette from 'components/Roulette/Roulette'

const InnerComponent = ({ speed, difficulty, list }) => (
  <Layout
    leftIcon={<GoBack to="/" />}
    caption={<Caption difficulty={difficulty} />}
  >
    <Roulette
      speed={speed}
      data={list}
      onSelectItem={item =>
        // eslint-disable-next-line no-alert
        window.alert(`you tapped the item ${item.title}`)
      }
    />
  </Layout>
)

const SpeedComponent = difficulty => list => (
  <List
    name="game_settings"
    path={`/game_settings`}
    render={speedList => {
      const speed = speedList[0][`${difficulty}CarouselSpeed`]

      return InnerComponent({
        difficulty,
        list,
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
