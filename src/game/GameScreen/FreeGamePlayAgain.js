import React from 'react'
import { connect } from 'react-redux'
import { Button, Typography } from '@material-ui/core'

import UserBalance from 'design/UserBalance'
import Layout from 'design/Layout/Layout'
import ProductImage from 'design/ProductImage'
import Caption from 'design/Caption/Caption'
import placeholder from './cardi_placeholder.png'

const Screen = ({ currentUser, location, product }) => {
  const mainText = product
    ? product.title
    : `Looks like you've already played this game, Click the "Play Again" below to Download Another App and play a new game`
  const productToShow = product || {
    image: placeholder,
  }

  return (
    <Layout
      location={location}
      currentUser={currentUser}
      leftIcon={<UserBalance />}
      confirmLeave
      caption={<Caption difficulty="easy" />}
    >
      <Typography align="center" variant="h5">
        {mainText}
      </Typography>

      <ProductImage product={productToShow} />

      <a
        href="https://www.verifyspot.net/cl.php?id=c6ab41e68cc1dd56233aa14ec2ed9859"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <Button
          variant="contained"
          style={{ backgroundColor: '#76fc03' }}
          fullWidth
        >
          Play Again
        </Button>
      </a>
    </Layout>
  )
}

export const mapState = ({ basket = {} }) => ({
  product: basket.product,
})

export default connect(mapState)(Screen)
