import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Provider as CroodsProvider } from 'croods'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'

import store from 'store/store'
import Router from './Router'
import theme from './theme'

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <CroodsProvider baseUrl={process.env.REACT_APP_API_URL}>
          <MuiThemeProvider theme={theme}>
            <React.Fragment>
              <CssBaseline />
              <Router />
            </React.Fragment>
          </MuiThemeProvider>
        </CroodsProvider>
      </Provider>
    )
  }
}
