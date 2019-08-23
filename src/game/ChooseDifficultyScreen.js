import React, { useState, useLayoutEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Layout from 'design/Layout/Layout'
import { Redirect } from '@reach/router'

import UserBalance from 'design/UserBalance'
import ProfileLink from 'design/ProfileLink/ProfileLink'
import DifficultyButton from './DifficultyButton'
import SpeedComponent from './SpeedComponent'
import AdminText from '../design/AdminText/AdminText'

const styles = theme => ({
  buttonGroup: {
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
})

const difficulties = ([firstLabel, secondLabel, thirdLabel] = []) => [
  {
    difficulty: 'easy',
    label: firstLabel || 'EASY',
    to: '/game/easy',
  },
  {
    difficulty: 'medium',
    label: secondLabel || 'MEDIUM',
    to: '/game/medium',
  },
  {
    difficulty: 'hard',
    label: thirdLabel || 'HARD',
    to: '/game/hard',
  },
]

const ChooseDifficultyScreen = withStyles(styles)(
  ({ navigate, classes, settings, currentUser, location, setCurrentUser }) => (
    <AdminText
      tags={[
        'difficulty_title',
        'difficulty_bottom_text',
        'difficulty_first_level_label',
        'difficulty_second_level_label',
        'difficulty_third_level_label',
      ]}
      render={({
        difficultyTitle,
        difficultyBottomText,
        difficultyFirstLevelLabel,
        difficultySecondLevelLabel,
        difficultyThirdLevelLabel,
      }) => (
        <Layout
          location={location}
          currentUser={currentUser}
          leftIcon={<UserBalance />}
          rightIcon={<ProfileLink />}
        >
          <Typography align="center" variant="h5">
            {difficultyTitle}
          </Typography>
          <div className={classes.buttonGroup}>
            {difficulties([
              difficultyFirstLevelLabel,
              difficultySecondLevelLabel,
              difficultyThirdLevelLabel,
            ]).map(item => (
              <DifficultyButton
                key={item.difficulty}
                {...item}
                quantity={settings[`${item.difficulty}TicketAmount`]}
                availableTickets={currentUser.tickets}
                navigate={navigate}
                setCurrentUser={setCurrentUser}
              />
            ))}
          </div>

          <Typography align="center">{difficultyBottomText}</Typography>
        </Layout>
      )}
    />
  ),
)

const RedirectUserWithoutBalance = ({
  navigate,
  settings,
  currentUser = {},
  setCurrentUser,
  location,
}) => {
  const { tickets } = currentUser
  const [userCanPlay, setUserCanPlay] = useState(true)

  useLayoutEffect(() => {
    const userDifficulties = difficulties().filter(
      ({ difficulty }) => tickets >= settings[`${difficulty}TicketAmount`],
    )

    setUserCanPlay(userDifficulties.length > 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return userCanPlay ? (
    <ChooseDifficultyScreen
      location={location}
      navigate={navigate}
      settings={settings}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
    />
  ) : (
    <Redirect to="/buy-diamonds" noThrow />
  )
}

export default ({ navigate, setCurrentUser, currentUser, location }) => (
  <SpeedComponent
    render={settings => (
      <RedirectUserWithoutBalance
        navigate={navigate}
        settings={settings}
        setCurrentUser={setCurrentUser}
        location={location}
        currentUser={currentUser}
      />
    )}
  />
)
