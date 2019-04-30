import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'
import { Button, Typography } from '@material-ui/core'

import { clearProduct } from 'store/basket/actions'

import GoBack from 'design/GoBack/GoBack'
import Layout from 'design/Layout/Layout'
import Caption from 'design/Caption/Caption'
import ProductImage from 'design/ProductImage'

import SellItBack from './SellItBack'

const InnerComponent = ({ product, classes, difficulty, navigate, ...props }) =>
  product ? (
    <Layout
      leftIcon={<GoBack to="/" />}
      caption={<Caption difficulty={difficulty} />}
    >
      <Typography align="center" variant="h5">
        {product.title}
      </Typography>

      <ProductImage product={product} />
      <Typography align="center">MSRP: ${product.price}</Typography>

      <SellItBack
        amount={3}
        clearProduct={props.clearProduct}
        navigate={navigate}
      />

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
