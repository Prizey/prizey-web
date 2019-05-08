import React from 'react'
import { Router } from '@reach/router'

import ChooseDifficultyScreen from 'game/ChooseDifficultyScreen'
import HomeScreen from 'game/home/HomeScreen'
import GameScreen from 'game/GameScreen'
import ClaimProductScreen from 'game/ClaimProductScreen'
import SoldBackScreen from 'game/SoldBackScreen'

import SignInScreen from 'auth/SignInScreen'
import SignUpScreen from 'auth/SignUpScreen'
import UserBlockedScreen from 'auth/UserBlockedScreen'
import ResetPasswordScreen from 'auth/ResetPasswordScreen'
import ForgotPasswordScreen from 'auth/ForgotPasswordScreen'
import ForgotSentScreen from 'auth/ForgotSentScreen'

import ShippingConfirmation from 'shipping/ShippingConfirmation'
import ShippingInfo from 'shipping/ShippingInfo'
import ConfirmOrder from 'shipping/ConfirmOrder'

import UserProfile from 'profile/UserProfile'

import PaymentInfo from 'payment/PaymentInfo'
import Paywall from 'payment/Paywall'

export default props => (
  <Router>
    <HomeScreen {...props} path="/" />
    <ChooseDifficultyScreen {...props} path="/game" />
    <GameScreen {...props} path="/game/:difficulty" />
    <ClaimProductScreen {...props} path="/game/:difficulty/claim" />
    <SoldBackScreen {...props} path="/sold-back" />

    <SignInScreen {...props} path="/sign-in" />
    <SignUpScreen {...props} path="/sign-up" />
    <UserBlockedScreen {...props} path="/blocked" />
    <ResetPasswordScreen {...props} path="/reset-password" />
    <ForgotPasswordScreen {...props} path="/forgot-password" />
    <ForgotSentScreen {...props} path="/forgot-password/sent" />

    <ShippingConfirmation {...props} path="/shipping-confirmation" />
    <ShippingInfo {...props} path="/shipping-info" />
    <ConfirmOrder {...props} path="/shipping-info/confirm" />

    <UserProfile {...props} path="/profile" />

    <Paywall {...props} path="/buy-diamonds" />
    <Paywall {...props} path="/buy-more" buyMore />
    <PaymentInfo {...props} path="/payment/:purchaseId" />
  </Router>
)
