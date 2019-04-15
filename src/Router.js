import React from 'react'
import { Router } from '@reach/router'

import Game from 'game/Game'

export default props => (
  <Router>
    <Game {...props} path="/" />
  </Router>
)
