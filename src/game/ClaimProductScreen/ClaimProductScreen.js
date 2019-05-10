import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'
import { Button, Typography } from '@material-ui/core'

import { clearProduct } from 'store/basket/actions'

import UserBalance from 'design/UserBalance'
import Layout from 'design/Layout/Layout'
import Caption from 'design/Caption/Caption'
import ProductImage from 'design/ProductImage'

import ProfileLink from 'design/ProfileLink/ProfileLink'
import SellItBack from './SellItBack'

const ClaimProductComponent = ({
  currentUser,
  setCurrentUser,
  product,
  classes,
  difficulty,
  navigate,
  location,
  ...props
}) =>
  product ? (
    <Layout
      location={location}
      currentUser={currentUser}
      leftIcon={<UserBalance />}
      rightIcon={<ProfileLink />}
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
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
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
)(ClaimProductComponent)

export default ({ currentUser, ...props }) =>
  currentUser ? (
    <ClaimProductScreen currentUser={currentUser} {...props} />
  ) : (
    <Redirect to="/sign-in?next=/game" noThrow />
  )
