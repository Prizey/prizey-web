import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'
import { withStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'

import { clearProduct } from 'store/basket/actions'

import GoBack from 'design/GoBack/GoBack'
import Layout from 'design/Layout/Layout'

const styles = theme => ({
  productImage: {
    display: 'block',
    margin: 'auto',
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
    width: '200px',
  },
})

const ShippingComponent = withStyles(styles)(
  ({ product, classes, difficulty, navigate, ...props }) =>
    product ? (
      <Layout leftIcon={<GoBack to="/" />}>
        <Typography align="center" variant="h5">
          Sweet!
        </Typography>

        <img
          alt={product.title}
          src={product.image}
          className={classes.productImage}
        />

        <Typography align="center">
          We&apos;ll confirm through email.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          aria-label="Play again"
          onClick={() => {
            props.clearProduct()
            navigate('/')
          }}
        >
          PLAY AGAIN
        </Button>
      </Layout>
    ) : (
      <Redirect to="/" noThrow />
    ),
)

export const mapState = ({ basket = {} }) => ({
  product: basket.product,
})

const ShippingConfirmation = connect(
  mapState,
  { clearProduct },
)(props => <ShippingComponent {...props} />)

export default ({ currentUser, ...props }) =>
  currentUser ? (
    <ShippingConfirmation {...props} />
  ) : (
    <Redirect to="/sign-in?next=/shipping-confirmation" noThrow />
  )
