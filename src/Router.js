import React from 'react'
import { Router } from '@reach/router'

import ChooseDifficultyScreen from 'game/ChooseDifficultyScreen'
import GameScreen from 'game/GameScreen'

export default props => (
  <Router>
    <ChooseDifficultyScreen {...props} path="/" />
    <GameScreen {...props} path="/game/:difficulty" />
  </Router>
)
