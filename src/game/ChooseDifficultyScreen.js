import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import Layout from 'design/Layout/Layout'
import { List } from 'croods'
import get from 'lodash/get'

import UserBalance from 'design/UserBalance'
import ProfileLink from 'design/ProfileLink/ProfileLink'
import { Redirect } from '@reach/router'
import DifficultyButton from './DifficultyButton'
import AdminText from '../design/AdminText/AdminText'

const styles = theme => ({
  buttonGroup: {
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  freeDiamonds: {
    '&:hover': {
      background: get(theme.palette, 'difficulty.easy'),
    },
    background: get(theme.palette, 'difficulty.easy'),
  },
  icon: {
    height: theme.spacing.md,
  },
  label: {
    flexGrow: 1,
    textAlign: 'center',
  },
})

const difficulties = ([, secondLabel, thirdLabel] = []) => [
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
  ({ navigate, classes, currentUser, purchases, location, setCurrentUser }) => (
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
            <a
              href="https://www.liveappsearch.com/cl.php?id=bc4c7871d74a21ed7fa70b785d2cb6aa"
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.freeDiamonds}
              >
                <span className={classes.label}>
                  {difficultyFirstLevelLabel}
                </span>
              </Button>
            </a>
            {difficulties([
              difficultyFirstLevelLabel,
              difficultySecondLevelLabel,
              difficultyThirdLevelLabel,
            ]).map((item, position) => (
              <DifficultyButton
                key={item.difficulty}
                paymentId={get(purchases[position], 'id')}
                {...item}
                quantity={get(purchases[position], 'ticketAmount')}
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

export default ({ navigate, setCurrentUser, currentUser, location }) =>
  currentUser ? (
    <List
      name="purchaseOptions"
      path="/purchase_options"
      render={purchases => (
        <ChooseDifficultyScreen
          location={location}
          navigate={navigate}
          purchases={purchases}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
    />
  ) : (
    <Redirect to="/sign-in?next=/game" noThrow />
  )
