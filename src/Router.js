import React from 'react'
import { Router } from '@reach/router'

import ChooseDifficultyScreen from 'game/ChooseDifficultyScreen'
import GameScreen from 'game/GameScreen'

import SignInScreen from 'auth/SignInScreen'
import SignUpScreen from 'auth/SignUpScreen'
import ResetPasswordScreen from 'auth/ResetPasswordScreen'
import ForgotPasswordScreen from 'auth/ForgotPasswordScreen'
import ForgotSentScreen from 'auth/ForgotSentScreen'

export default props => (
  <Router>
    <ChooseDifficultyScreen {...props} path="/" />
    <GameScreen {...props} path="/game/:difficulty" />

    <SignInScreen {...props} path="/sign-in" />
    <SignUpScreen {...props} path="/sign-up" />
    <ResetPasswordScreen {...props} path="/reset-password" />
    <ForgotPasswordScreen {...props} path="/forgot-password" />
    <ForgotSentScreen {...props} path="/forgot-password/sent" />
  </Router>
)
