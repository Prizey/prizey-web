import React, { useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { navigate } from '@reach/router'

export const getState = state => ({ state })

export default connect(
  getState,
  null,
)(
  ({
    Component,
    authorize,
    unauthorized,
    currentUser,
    state,
    location,
    ...props
  }) => {
    useLayoutEffect(() => {
      if (!currentUser) {
        navigate(`/sign-in?next=${location.pathname}`)
      } else if (currentUser.blocked) {
        navigate('/blocked')
      }

      if (authorize) {
        authorize(state, currentUser) || navigate(unauthorized)
      }
    }, [authorize, currentUser, location, state, unauthorized])

    useLayoutEffect(() => {
      window.scrollTo(0, 0)
    }, [location])

    return currentUser ? (
      <Component {...props} currentUser={currentUser} location={location} />
    ) : null
  },
)
