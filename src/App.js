import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Provider as CroodsProvider } from 'croods'
import { Auth, credentials as credentialsProps } from 'croods-auth'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'

import LoadingComponent from 'design/Loading/Loading'
import ErrorComponent from 'design/Error/Error'

import store from 'store/store'
import FlashMessage from 'seasoned-flash'
import Router from './Router'
import theme from './theme'

import 'App.css'

export default class extends Component {
  render() {
    return (
      <FlashMessage>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <CroodsProvider
              baseUrl={process.env.REACT_APP_API_URL}
              renderLoading={LoadingComponent}
              renderError={ErrorComponent}
              {...credentialsProps}
            >
              <Auth
                renderLoading={LoadingComponent}
                render={props => <Router {...props} />}
              />
            </CroodsProvider>
          </MuiThemeProvider>
        </Provider>
      </FlashMessage>
    )
  }
}
