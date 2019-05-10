import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import PlayAgain from 'design/PlayAgain'
import TransactionComponent from 'game/TransactionComponent'

const TICKET_AMOUNT = 3

const styles = theme => ({
  icon: {
    height: theme.spacing.md,
  },
  quantity: {
    marginLeft: theme.spacing.xs,
    marginRight: theme.spacing.xs,
    width: theme.spacing.sm,
  },
  rightIcon: {
    alignItems: 'center',
    display: 'flex',
    height: theme.spacing.md,
    position: 'absolute',
    right: 0,
  },
})

export const handleConfirm = ({ creating, create, amount }) => () => {
  if (!creating) {
    create({ amount })
  }
}

export class SellItBackComponent extends React.Component {
  state = {
    dialogIsOpen: false,
  }

  renderError = ({ error }) =>
    error && (
      <Typography color="error" align="center" variant="h6">
        {error}
      </Typography>
    )

  renderButton = ({ creating, classes }) => (
    <Button
      aria-label="Sell it Back"
      variant="contained"
      color="secondary"
      fullWidth
      onClick={() => this.setState({ dialogIsOpen: true })}
    >
      {creating ? (
        <CircularProgress color="inherit" size={30} />
      ) : (
        <Fragment>
          <span>SELL IT BACK</span>
          <div className={classes.rightIcon}>
            <img
              src="/icons/diamond.png"
              alt="diamond"
              className={classes.icon}
            />
            <span className={classes.quantity}>{TICKET_AMOUNT}</span>
          </div>
        </Fragment>
      )}
    </Button>
  )

  render() {
    const { dialogIsOpen } = this.state

    return (
      <Fragment>
        {this.renderError(this.props)}
        <PlayAgain
          aria-label="Play again modal"
          isOpen={dialogIsOpen}
          close={() => this.setState({ dialogIsOpen: false })}
          confirm={handleConfirm(this.props)}
        >
          You&apos;ll sell the product and get diamonds. This can&apos;t be
          undone.
        </PlayAgain>

        {this.renderButton(this.props)}
      </Fragment>
    )
  }
}

export const afterCreate = ({
  navigate,
  currentUser,
  setCurrentUser,
}) => () => {
  setCurrentUser({
    ...currentUser,
    tickets: currentUser.tickets + TICKET_AMOUNT,
  })
  navigate('/sold-back')
}

export default withStyles(styles)(props => (
  <TransactionComponent
    render={renderProps => <SellItBackComponent {...props} {...renderProps} />}
    afterCreate={afterCreate(props)}
  />
))
