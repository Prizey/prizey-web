import React from 'react'
import { List } from 'croods'

import GoBack from 'components/GoBack/GoBack'
import Caption from 'components/Caption/Caption'
import Layout from 'components/Layout/Layout'
import Roulette from 'components/Roulette/Roulette'

const speeds = {
  easy: 500,
  hard: 125,
  medium: 250,
}

export default ({ difficulty = 'easy' }) => (
  <List
    name="products"
    path={`/products/${difficulty}`}
    render={list => (
      <Layout
        leftIcon={<GoBack to="/" />}
        caption={<Caption difficulty={difficulty} />}
      >
        <Roulette
          speed={speeds[difficulty]}
          data={list}
          onSelectItem={item =>
            // eslint-disable-next-line no-alert
            window.alert(`you tapped the item ${item.title}`)
          }
        />
      </Layout>
    )}
  />
)
