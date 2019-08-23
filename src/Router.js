import React from 'react'
import { Router } from '@reach/router'

import Route from 'auth/Route'

import ChooseDifficultyScreen from 'game/ChooseDifficultyScreen'
import HomeScreen from 'game/home/HomeScreen'
import GameScreen from 'game/GameScreen'
import ClaimProductScreen from 'game/ClaimProductScreen'
import SoldBackScreen from 'game/SoldBackScreen'
import AllPrizesScreen from 'game/AllPrizesScreen'

import SignInScreen from 'auth/SignInScreen'
import SignUpScreen from 'auth/SignUpScreen'
import UserBlockedScreen from 'auth/UserBlockedScreen'
import GameDownScreen from 'auth/GameDownScreen'
import ResetPasswordScreen from 'auth/ResetPasswordScreen'
import ForgotPasswordScreen from 'auth/ForgotPasswordScreen'
import ForgotSentScreen from 'auth/ForgotSentScreen'

import ShippingConfirmation from 'shipping/ShippingConfirmation'
import ShippingInfo from 'shipping/ShippingInfo'
import ConfirmOrder from 'shipping/ConfirmOrder'

import UserProfile from 'profile/UserProfile'
import AdVideoScreen from 'advideo/AdVideoScreen'
import RewardScreen from 'advideo/RewardScreen'

import PaymentInfo from 'payment/PaymentInfo'
import FairnessScreen from 'fairness/FairnessScreen'
import TermsOfService from 'termsOfService/TermsOfServiceScreen'
import PrivacyPolicy from 'privacyPolicy/PrivacyPolicy'

export const authorizeGameFlow = state => state.basket.paid
export const authorizeShippingFlow = state =>
  state.basket.paid && state.basket.product

export default props => (
  <Router>
    <HomeScreen {...props} path="/" />

    <Route Component={ChooseDifficultyScreen} {...props} path="/game" />
    <Route
      Component={GameScreen}
      {...props}
      path="/game/:difficulty"
      authorize={authorizeGameFlow}
      unauthorized="/game"
    />
    <Route
      Component={ClaimProductScreen}
      {...props}
      authorize={authorizeShippingFlow}
      unauthorized="/game"
      path="/game/:difficulty/claim"
    />
    <Route
      Component={SoldBackScreen}
      {...props}
      authorize={authorizeShippingFlow}
      unauthorized="/game"
      path="/sold-back"
    />
    <AllPrizesScreen {...props} path="/all-prizes" />

    <SignInScreen {...props} path="/sign-in" />
    <SignUpScreen {...props} path="/sign-up" />
    <UserBlockedScreen {...props} path="/blocked" />
    <GameDownScreen {...props} path="/game-down" />
    <ResetPasswordScreen {...props} path="/reset-password" />
    <ForgotPasswordScreen {...props} path="/forgot-password" />
    <ForgotSentScreen {...props} path="/forgot-password/sent" />

    <Route
      Component={ShippingConfirmation}
      {...props}
      authorize={authorizeShippingFlow}
      unauthorized="/game"
      path="/shipping-confirmation"
    />
    <Route
      Component={ShippingInfo}
      {...props}
      authorize={authorizeShippingFlow}
      unauthorized="/game"
      path="/shipping-info"
    />
    <Route
      Component={ConfirmOrder}
      {...props}
      authorize={authorizeShippingFlow}
      unauthorized="/game"
      path="/shipping-info/confirm"
    />

    <AdVideoScreen {...props} path="/advertising" />
    <RewardScreen {...props} path="/reward" />

    <UserProfile {...props} path="/profile" />
    <FairnessScreen {...props} path="/faq" />
    <TermsOfService {...props} path="/terms_of_service" />
    <PrivacyPolicy {...props} path="/privacy-policy" />

    <Route Component={PaymentInfo} {...props} path="/payment/:purchaseId" />
  </Router>
)
