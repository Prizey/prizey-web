import React from 'react'
import SpeedComponent from '../SpeedComponent'
import GameComponent from './GameComponent'

export default (
  difficulty,
  navigate,
  currentUser,
  location,
  freegame,
  freegameNextPath,
  hideLogin,
) => list => (
  <SpeedComponent
    render={settings => {
      const speed =
        difficulty === 'trial'
          ? settings.easyCarouselSpeed
          : settings[`${difficulty}CarouselSpeed`]

      return (
        <GameComponent
          location={location}
          currentUser={currentUser}
          list={list}
          difficulty={difficulty}
          multiplier={settings.priceMultiplier}
          navigate={navigate}
          speed={speed}
          freegame={freegame}
          freegameNextPath={freegameNextPath}
          hideLogin={hideLogin}
        />
      )
    }}
  />
)
