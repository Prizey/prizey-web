import React from 'react'
import { connect } from 'react-redux'
import { Link } from '@reach/router'
import { withStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'

import GoBack from 'design/GoBack/GoBack'
import Layout from 'design/Layout/Layout'
import Caption from 'design/Caption/Caption'

const styles = theme => ({
  icon: {
    height: theme.spacing.md,
  },
  productImage: {
    display: 'block',
    margin: 'auto',
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
    width: '130px',
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

const InnerComponent = withStyles(styles)(
  ({ product, classes, difficulty }) => (
    <Layout
      leftIcon={<GoBack to={`game/${difficulty}`} />}
      caption={<Caption difficulty={difficulty} />}
    >
      <Typography align="center" variant="h5">
        {product.title}
      </Typography>

      <img
        alt={product.title}
        src={product.image}
        className={classes.productImage}
      />

      <Typography align="center">MSRP: ${product.price}</Typography>

      <Button
        variant="contained"
        color="secondary"
        fullWidth
        component={props => <Link to="/" {...props} />}
      >
        <span>SELL IT BACK</span>
        <div className={classes.rightIcon}>
          <img
            src="/icons/diamond.png"
            alt="diamond"
            className={classes.icon}
          />
          <span className={classes.quantity}>3</span>
        </div>
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => {
          // eslint-disable-next-line no-alert
          window.alert(`shipping process of the item ${product.title}`)
        }}
      >
        I WANT IT!
      </Button>
    </Layout>
  ),
)

export const mapState = ({ order = {} }) => ({
  product: order.product,
})

export default connect(
  mapState,
  null,
)(({ difficulty, product }) => (
  <InnerComponent product={product} difficulty={difficulty} />
))
