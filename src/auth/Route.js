import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { navigate } from '@reach/router'

export default connect(
  state => ({ state }),
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
    useEffect(() => {
      if (!currentUser) {
        navigate(`/sign-in?next=${location.pathname}`)
      } else if (currentUser.blocked) {
        navigate('/blocked')
      }

      if (authorize) {
        authorize(state, currentUser) || navigate(unauthorized)
      }
    }, [authorize, currentUser, location, state, unauthorized])

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [location])

    return (
      <Component {...props} currentUser={currentUser} location={location} />
    )
  },
)
