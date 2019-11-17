import React from 'react'
import { List } from 'croods'
import { Redirect } from '@reach/router'
import ScreenWithSpeed from './ScreenWithSpeed'

export default ({
  freegame,
  currentUser,
  location,
  navigate,
  difficulty = 'easy',
}) =>
  freegame || currentUser ? (
    <List
      name="products"
      path={`/products/${difficulty}`}
      render={ScreenWithSpeed(difficulty, navigate, currentUser, location)}
    />
  ) : (
    <Redirect to={`/sign-in?next=/game/${difficulty}`} noThrow />
  )
