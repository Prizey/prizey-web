import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  productImage: {
    display: 'block',
    margin: 'auto',
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
    width: '130px',
  },
})

export default withStyles(styles)(({ classes, product, style = {} }) => (
  <img
    alt={product.title}
    src={product.image}
    className={classes.productImage}
    style={style}
  />
))
