import React from 'react'
import { Router } from '@reach/router'

import ChooseDifficultyScreen from 'game/ChooseDifficultyScreen'
import GameScreen from 'game/GameScreen'
import ClaimProductScreen from 'game/ClaimProductScreen'

import SignInScreen from 'auth/SignInScreen'
import SignUpScreen from 'auth/SignUpScreen'
import UserBlockedScreen from 'auth/UserBlockedScreen'
import ResetPasswordScreen from 'auth/ResetPasswordScreen'
import ForgotPasswordScreen from 'auth/ForgotPasswordScreen'
import ForgotSentScreen from 'auth/ForgotSentScreen'

import ShippingInfo from 'shipping/ShippingInfo'
import ConfirmOrder from 'shipping/ConfirmOrder'

export default props => (
  <Router>
    <ChooseDifficultyScreen {...props} path="/" />
    <GameScreen {...props} path="/game/:difficulty" />
    <ClaimProductScreen {...props} path="/game/:difficulty/claim" />

    <SignInScreen {...props} path="/sign-in" />
    <SignUpScreen {...props} path="/sign-up" />
    <UserBlockedScreen {...props} path="/blocked" />
    <ResetPasswordScreen {...props} path="/reset-password" />
    <ForgotPasswordScreen {...props} path="/forgot-password" />
    <ForgotSentScreen {...props} path="/forgot-password/sent" />

    <ShippingInfo {...props} path="/shipping-info" />
    <ConfirmOrder {...props} path="/shipping-info/confirm" />
  </Router>
)
