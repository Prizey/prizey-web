import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Provider as CroodsProvider } from 'croods'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import store from 'store/store'

import Layout from 'components/Layout/Layout'
import Roulette from 'components/Roulette/Roulette'

import theme from './theme'

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <CroodsProvider baseUrl={process.env.REACT_APP_API_URL}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Roulette
                speed={250}
                data={[
                  '/mocks/trump-mask.png',
                  '/mocks/sweatshirt.png',
                  '/mocks/shoe.png',
                ]}
              />
            </Layout>
          </MuiThemeProvider>
        </CroodsProvider>
      </Provider>
    )
  }
}
