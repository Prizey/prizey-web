import React from 'react'
import get from 'lodash/get'
import { Link } from '@reach/router'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const styles = theme => ({
  icon: {
    height: theme.spacing.md,
  },
  label: {
    flexGrow: 1,
    textAlign: 'center',
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
    background: get(theme.palette, 'difficulty.easy'),
  },
  root_hard: {
    background: get(theme.palette, 'difficulty.hard'),
  },
  root_medium: {
    background: get(theme.palette, 'difficulty.medium'),
  },
})

export default withStyles(styles)(
  ({ classes, productImage, label, difficulty, to, quantity }) => (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      className={classes[`root_${difficulty}`]}
      component={props => <Link to={to} {...props} />}
    >
      <img src={productImage} alt="product" className={classes.product} />
      <span className={classes.label}>{label}</span>
      <img src="/icons/diamond.png" alt="diamond" className={classes.icon} />
      <span className={classes.quantity}>{quantity}</span>
    </Button>
  ),
)
