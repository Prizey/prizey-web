import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'
import { withStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'

import { clearProduct } from 'store/basket/actions'

import GoBack from 'design/GoBack/GoBack'
import Layout from 'design/Layout/Layout'
import Caption from 'design/Caption/Caption'

import SellItBack from './SellItBack'

const styles = theme => ({
  productImage: {
    display: 'block',
    margin: 'auto',
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
    width: '130px',
  },
})

const InnerComponent = withStyles(styles)(
  ({ product, classes, difficulty, navigate, ...props }) =>
    product ? (
      <Layout
        leftIcon={<GoBack to="/" />}
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

        <SellItBack amount={3} clearProduct={props.clearProduct} />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          aria-label="I want it"
          onClick={() => {
            navigate('/shipping-info')
          }}
        >
          I WANT IT!
        </Button>
      </Layout>
    ) : (
      <Redirect to="/" noThrow />
    ),
)

export const mapState = ({ basket = {} }) => ({
  product: basket.product,
})

const ClaimProductScreen = connect(
  mapState,
  { clearProduct },
)(props => <InnerComponent {...props} />)

export default ({ currentUser, ...props }) =>
  currentUser ? (
    <ClaimProductScreen {...props} />
  ) : (
    <Redirect to="/sign-in" noThrow />
  )
