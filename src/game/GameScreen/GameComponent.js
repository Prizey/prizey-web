import React from 'react'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'

import { chooseProduct } from 'store/basket/actions'

import UserBalance from 'design/UserBalance'
import Caption from 'design/Caption/Caption'
import Layout from 'design/Layout/Layout'
import ProfileLink from 'design/ProfileLink/ProfileLink'
import Roulette from '../Roulette'

export default connect(
  null,
  { chooseProduct },
)(
  ({
    speed,
    difficulty,
    list,
    multiplier,
    currentUser,
    location,
    freegame,
    hideLogin,
    ...props
  }) => (
    <Layout
      leftIcon={<UserBalance />}
      caption={<Caption difficulty={difficulty} />}
      location={location}
      currentUser={currentUser}
      rightIcon={!hideLogin && <ProfileLink confirmLeave />}
      confirmLeave
    >
      <Roulette
        aria-label="roulette"
        speed={speed}
        data={list}
        multiplier={multiplier}
        onSelectItem={item => {
          props.chooseProduct(item)
          if (freegame) {
            props.navigate(`/freegame-play-again`)
          } else {
            props.navigate(`/game/${difficulty}/claim`)
          }
        }}
      />
      <br />
      <Typography align="center" variant="body2" color="textSecondary">
        Tap the screen, <br />
        win what you tap.
      </Typography>
    </Layout>
  ),
)
