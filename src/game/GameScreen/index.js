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
  const path = pageId ? `/freegame_ips/${pageId}` : 'freegame_ips'

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
            navigate('/freegame-play-again')
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
