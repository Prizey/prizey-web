import React from 'react'
import { Router } from '@reach/router'

import ChooseDifficulty from 'game/ChooseDifficulty'
import Game from 'game/Game'

import SignInScreen from 'auth/SignInScreen'
import SignUpScreen from 'auth/SignUpScreen'
import ResetPasswordScreen from 'auth/ResetPasswordScreen'
import ForgotPasswordScreen from 'auth/ForgotPasswordScreen'
import ForgotSentScreen from 'auth/ForgotSentScreen'

export default props => (
  <Router>
    <ChooseDifficulty {...props} path="/" />
    <Game {...props} path="/game/:difficulty" />

    <SignInScreen {...props} path="/sign-in" />
    <SignUpScreen {...props} path="/sign-up" />
    <ResetPasswordScreen {...props} path="/reset-password" />
    <ForgotPasswordScreen {...props} path="/forgot-password" />
    <ForgotSentScreen {...props} path="/forgot-password/sent" />
  </Router>
)
