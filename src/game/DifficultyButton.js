import React from 'react'
import { List } from 'croods'
import get from 'lodash/get'
import { Link } from '@reach/router'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

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

export default withStyles(styles)(
  ({ classes, label, difficulty, to, quantity }) => (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      className={classes[`root_${difficulty}`]}
      component={props => <Link to={to} {...props} />}
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
      <span className={classes.quantity}>{quantity}</span>
    </Button>
  ),
)
