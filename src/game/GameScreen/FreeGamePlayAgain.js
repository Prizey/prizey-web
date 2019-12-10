import React from 'react'
import { connect } from 'react-redux'
import capitalize from 'lodash/capitalize'
import { Button, Typography } from '@material-ui/core'

import AdminText from 'design/AdminText/AdminText'
import UserBalance from 'design/UserBalance'
import Layout from 'design/Layout/Layout'
import ProductImage from 'design/ProductImage'
import Caption from 'design/Caption/Caption'
import placeholder from './cardi_placeholder.png'

export const getTag = (obj, tagName, tagSufix) =>
  obj[tagName + capitalize(tagSufix)] || obj[tagName]

const Screen = ({
  currentUser,
  location,
  product,
  mainText,
  buttonText,
  buttonUrl,
}) => {
  const textToShow = product ? product.title : mainText
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
        {textToShow}
      </Typography>

      <ProductImage product={productToShow} />

      <a
        href={buttonUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <Button
          variant="contained"
          style={{ backgroundColor: '#76fc03' }}
          fullWidth
        >
          {buttonText}
        </Button>
      </a>
    </Layout>
  )
}

const FreeGamePlayAgain = ({ pageId, ...props }) => {
  const tags = [
    'free_game_main_text',
    'free_game_button_text',
    'free_game_button_url',
  ]
  if (pageId) {
    tags.push(
      `free_game_main_text_${pageId}`,
      `free_game_button_text_${pageId}`,
      `free_game_button_url_${pageId}`,
    )
  }

  return (
    <AdminText
      tags={tags}
      render={info => {
        const mainText = getTag(info, 'freeGameMainText', pageId)
        const buttonText = getTag(info, 'freeGameButtonText', pageId)
        const buttonUrl = getTag(info, 'freeGameButtonUrl', pageId)

        return (
          <Screen
            mainText={mainText}
            buttonText={buttonText}
            buttonUrl={buttonUrl}
            {...props}
          />
        )
      }}
    />
  )
}

export const mapState = ({ basket = {} }) => ({
  product: basket.product,
})

export default connect(mapState)(FreeGamePlayAgain)
