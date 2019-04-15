import React from 'react'
import { List } from 'croods'

import Layout from 'components/Layout/Layout'
import Roulette from 'components/Roulette/Roulette'

export default ({ difficulty = 'easy' }) => (
  <List
    name="products"
    path={`/products/${difficulty}`}
    render={list => (
      <Layout>
        <Roulette
          speed={250}
          data={list}
          onSelectItem={item =>
            // eslint-disable-next-line no-alert
            window.alert(`you choose the item ${item.title}`)
          }
        />
      </Layout>
    )}
  />
)
