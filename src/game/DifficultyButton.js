import React from 'react'
import { List } from 'croods'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Redirect } from '@reach/router'
import CircularProgress from '@material-ui/core/CircularProgress'

import TransactionComponent from 'game/TransactionComponent'
import { insertCoin } from 'store/basket/actions'

const styles = theme => ({
  icon: {
    height: theme.spacing.md,
  },
  label: {
    flexGrow: 1,
    textAlign: 'center',
  },
  loading: {
    marginRight: theme.spacing.xs,
  },
  product: {
    marginRight: theme.spacing.xs,
    width: theme.spacing.md,
  },
  quantity: {
    display: 'inline-block',
    marginLeft: theme.spacing.xs,
    width: theme.spacing.sm,
  },
  root_easy: {
    '&:hover': {
      background: get(theme.palette, 'difficulty.easy'),
    },
    background: get(theme.palette, 'difficulty.easy'),
  },
  root_hard: {
    '&:hover': {
      background: get(theme.palette, 'difficulty.hard'),
    },
    background: get(theme.palette, 'difficulty.hard'),
  },
  root_medium: {
    '&:hover': {
      background: get(theme.palette, 'difficulty.medium'),
    },
    background: get(theme.palette, 'difficulty.medium'),
  },
})

export const handleClick = ({
  availableTickets,
  quantity,
  navigate,
  create,
}) => () => {
  if (availableTickets < quantity) {
    return navigate('/buy-more')
  }

  return create({ amount: quantity * -1 })
}

export const afterCreate = ({
  setCurrentUser,
  navigate,
  to,
  insertCoin: insertCoinAction,
}) => ({ created: { user } }) => {
  navigate(to)
  setCurrentUser(user)
  insertCoinAction()
}

export const DifficultyButtonComponent = withStyles(styles)(
  ({ classes, label, difficulty, ...props }) => (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      className={classes[`root_${difficulty}`]}
      onClick={handleClick(props)}
    >
      <List
        parentId={difficulty}
        name="products"
        path={`/products/${difficulty}`}
        renderLoading={() => (
          <CircularProgress
            color="inherit"
            size={30}
            className={classes.loading}
          />
        )}
        render={list => {
          const productImage = list[0].image
          return (
            <img src={productImage} alt="product" className={classes.product} />
          )
        }}
      />

      <span className={classes.label}>{label}</span>
      <img src="/icons/diamond.png" alt="diamond" className={classes.icon} />
      <span className={classes.quantity}>{props.quantity}</span>
    </Button>
  ),
)

export default connect(
  null,
  { insertCoin },
)(props => (
  <TransactionComponent
    source="play"
    render={({ error, ...renderProps }) =>
      error ? (
        <Redirect to="/buy-more" noThrow />
      ) : (
        <DifficultyButtonComponent {...props} {...renderProps} />
      )
    }
    afterCreate={afterCreate(props)}
  />
))
