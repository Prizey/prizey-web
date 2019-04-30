import React, { Fragment } from 'react'
import { New } from 'croods'
import { withStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import PlayAgain from 'design/PlayAgain'

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

  render() {
    const { dialogIsOpen } = this.state
    const { classes, creating, error } = this.props

    return (
      <Fragment>
        {error && (
          <Typography color="error" align="center" variant="h6">
            {error}
          </Typography>
        )}

        <PlayAgain
          isOpen={dialogIsOpen}
          close={() => this.setState({ dialogIsOpen: false })}
          confirm={handleConfirm(this.props)}
        >
          When you sell back, you can&apos;t undo this.
        </PlayAgain>

        <Button
          aria-label="action-button"
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
                <span className={classes.quantity}>3</span>
              </div>
            </Fragment>
          )}
        </Button>
      </Fragment>
    )
  }
}

export const afterCreate = ({ navigate }) => () => {
  navigate('/sold-back')
}

export default withStyles(styles)(props => (
  <New
    name="tickets"
    path="/ticket_transactions"
    render={renderProps => <SellItBackComponent {...props} {...renderProps} />}
    afterCreate={afterCreate(props)}
  />
))
