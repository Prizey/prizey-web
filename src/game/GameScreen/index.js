import React from 'react'
import { List, Info } from 'croods'
import { Redirect } from '@reach/router'
import ScreenWithSpeed from './ScreenWithSpeed'

export default ({
  freegame,
  currentUser,
  location,
  navigate,
  difficulty = 'easy',
  hideLogin,
  pageId,
}) => {
  const path = pageId ? `/freegame/${pageId}` : '/freegame'
  const freegameNextPath = pageId
    ? `/freegame-play-again/${pageId}`
    : '/freegame-play-again'

  if (freegame) {
    return (
      <Info
        id={1}
        disableCache
        name="freegameIps"
        path={path}
        method="POST"
        render={info => {
          if (info && info.ipBlocked) {
            navigate(freegameNextPath)
          }

          return (
            <List
              disableCache
              name="products"
              path={`/products/${difficulty}`}
              render={ScreenWithSpeed(
                difficulty,
                navigate,
                currentUser,
                location,
                freegame,
                freegameNextPath,
                hideLogin,
              )}
            />
          )
        }}
      />
    )
  }

  return currentUser ? (
    <List
      name="products"
      path={`/products/${difficulty}`}
      render={ScreenWithSpeed(difficulty, navigate, currentUser, location)}
    />
  ) : (
    <Redirect to={`/sign-in?next=/game/${difficulty}`} noThrow />
  )
}
