import React from 'react'
import SpeedComponent from '../SpeedComponent'
import GameComponent from './GameComponent'

export default (difficulty, navigate, currentUser, location) => list => (
  <SpeedComponent
    render={settings => {
      const speed = settings[`${difficulty}CarouselSpeed`]

      return (
        <GameComponent
          location={location}
          currentUser={currentUser}
          list={list}
          difficulty={difficulty}
          multiplier={settings.priceMultiplier}
          navigate={navigate}
          speed={speed}
        />
      )
    }}
  />
)
