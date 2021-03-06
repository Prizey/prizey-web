import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'
import { Button, Typography } from '@material-ui/core'

import { clearProduct } from 'store/basket/actions'

import UserBalance from 'design/UserBalance'
import Layout from 'design/Layout/Layout'
import ProductImage from 'design/ProductImage'
import ProfileLink from 'design/ProfileLink/ProfileLink'

const ShippingComponent = ({
  product,
  classes,
  difficulty,
  navigate,
  currentUser,
  location,
  ...props
}) =>
  product ? (
    <Layout
      location={location}
      currentUser={currentUser}
      leftIcon={<UserBalance />}
      rightIcon={<ProfileLink />}
    >
      <Typography align="center" variant="h5">
        Sweet!
      </Typography>

      <ProductImage product={product} style={{ width: '200px' }} />
      <Typography align="center">We&apos;ll confirm through email.</Typography>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        aria-label="Play again"
        onClick={() => {
          props.clearProduct()
          navigate('/game')
        }}
      >
        PLAY AGAIN
      </Button>
    </Layout>
  ) : (
    <Redirect to="/game" noThrow />
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
    <Redirect to="/sign-in?next=/game" noThrow />
  )
