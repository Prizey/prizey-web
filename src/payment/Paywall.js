import React from 'react'
import { List } from 'croods'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import Layout from 'design/Layout/Layout'
import { Redirect, Link } from '@reach/router'

import GoBack from 'design/GoBack/GoBack'
import UserBalance from 'design/UserBalance'

import getButtonText from './purchaseDescription'

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
  icon: {
    height: theme.spacing.md,
    marginRight: theme.spacing.xs,
  },
})

const PaywallScreen = withStyles(styles)(
  ({ classes, buttons, buyMore = false }) => (
    <Layout leftIcon={buyMore ? <UserBalance /> : <GoBack to="/" />}>
      <Typography align="center" variant="h5">
        {buyMore
          ? "You don't have enough for that game, add more to your account to play."
          : 'Purchase diamonds to play, win something every time.'}
      </Typography>

      <div className={classes.buttonGroup}>
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

export default ({ currentUser, buyMore = false }) =>
  currentUser ? (
    <List
      name="purchaseOptions"
      path="/purchase_options"
      render={buttons => <PaywallScreen buyMore={buyMore} buttons={buttons} />}
    />
  ) : (
    <Redirect
      to={`/sign-in?next=/${buyMore ? 'buy-more' : 'buy-diamonds'}`}
      noThrow
    />
  )
