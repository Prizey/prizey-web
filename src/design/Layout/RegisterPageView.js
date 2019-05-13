import React from 'react'
import ReactGA from 'react-ga'

export default class RegisterPageView extends React.Component {
  render() {
    return null
  }

  componentDidMount() {
    const { location = window.location, currentUser } = this.props
    const gaOptions = currentUser
      ? {
          gaOptions: {
            userId: currentUser.id,
          },
        }
      : {}

    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_CODE, {
      testMode: process.env.NODE_ENV !== 'production',
      ...gaOptions,
    })

    ReactGA.pageview(location.pathname)
  }
}
