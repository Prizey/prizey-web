import React from 'react'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import Layout from 'design/Layout/Layout'
import { Redirect, Link } from '@reach/router'

import GoBack from 'design/GoBack/GoBack'
import UserBalance from 'design/UserBalance'

import AdminText from 'design/AdminText/AdminText'
import ProfileLink from 'design/ProfileLink/ProfileLink'
import getButtonText from './purchaseDescription'
import PurchaseOptions from './PurchaseOptions'

const styles = theme => ({
  button0: {
    '&:hover': {
      background: get(theme.palette, 'paywall.first'),
    },
    background: get(theme.palette, 'paywall.first'),
  },
  button1: {
    '&:hover': {
      background: get(theme.palette, 'paywall.second'),
    },
    background: get(theme.palette, 'paywall.second'),
  },
  buttonGroup: {
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  buttonReward: {
    '&:hover': {
      background: get(theme.palette, 'paywall.reward'),
    },
    background: get(theme.palette, 'paywall.reward'),
    padding: '6px',
  },
  icon: {
    height: theme.spacing.md,
    marginRight: theme.spacing.xs,
  },
})

const PaywallScreen = withStyles(styles)(
  ({ classes, buttons, buyMore = false, info, currentUser, location }) => (
    <Layout
      location={location}
      currentUser={currentUser}
      leftIcon={buyMore ? <UserBalance /> : <GoBack to="/" />}
      rightIcon={<ProfileLink />}
    >
      <Typography align="center" variant="h5">
        {buyMore
          ? "You don't have enough for that game, add more to your account to play."
          : 'Purchase diamonds to play, win something every time.'}
      </Typography>

      <div className={classes.buttonGroup}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.buttonReward}
          component={props => <Link to="/advertising" {...props} />}
        >
          {info.paywallRewardCta || ''}
        </Button>
        {buttons.map(({ id, ticketAmount, price }, idx) => (
          <Button
            key={idx}
            variant="contained"
            color="primary"
            fullWidth
            className={classes[`button${idx}`]}
            component={props => <Link to={`/payment/${id}`} {...props} />}
          >
            <img
              src="/icons/diamond.png"
              alt="diamond"
              className={classes.icon}
            />
            {getButtonText(ticketAmount, price)}
          </Button>
        ))}
      </div>

      <Typography align="center" variant="body2" color="textSecondary">
        By proceeding, you agree you&apos;re 18+.
      </Typography>
    </Layout>
  ),
)

export default ({ currentUser, buyMore = false, location }) =>
  currentUser ? (
    <AdminText
      tags="paywall_reward_cta"
      render={info => (
        <PurchaseOptions
          render={buttons => (
            <PaywallScreen
              info={info}
              buyMore={buyMore}
              buttons={buttons}
              location={location}
            />
          )}
        />
      )}
    />
  ) : (
    <Redirect
      to={`/sign-in?next=/${buyMore ? 'buy-more' : 'buy-diamonds'}`}
      noThrow
    />
  )
