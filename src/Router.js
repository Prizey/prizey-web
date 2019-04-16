import React from 'react'
import { Router } from '@reach/router'

import ChooseDifficulty from 'game/ChooseDifficulty'
import Game from 'game/Game'

export default props => (
  <Router>
    <ChooseDifficulty {...props} path="/" />
    <Game {...props} path="/game/:difficulty" />
  </Router>
)
