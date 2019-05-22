import React, { useState } from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from 'react-stripe-elements'
import List from '@material-ui/core/List'
import { Grid, Button, CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import 'react-credit-cards/es/styles-compiled.css'

import ErrorComponent from 'design/Error/Error'
import StripeField from 'design/StripeField'
import CreditCardItem from './CreditCardItem'

export const handleSubmit = ({
  selectedCard,
  setError,
  stripe,
  create,
  purchase,
}) => async evt => {
  evt.preventDefault()

  try {
    if (selectedCard === 'new') {
      const result = await stripe.createToken({ type: 'card' })
      if (result.error) {
        setError(result.error.message)
      } else {
        create({
          credit_card_token: result.token.id,
          purchase_option_id: purchase.id,
        })
      }
    } else {
      create({
        credit_card_source: selectedCard,
        purchase_option_id: purchase.id,
      })
    }
  } catch (err) {
    setError(err.message)
  }

  return false
}

export const CreditCardFields = () => (
  <React.Fragment>
    <StripeField label="Card Number" component={CardNumberElement} />

    <Grid container spacing={24}>
      <Grid item xs>
        <StripeField label="Expiry (MM / YY)" component={CardExpiryElement} />
      </Grid>
      <Grid item xs>
        <StripeField label="CVC" component={CardCVCElement} />
      </Grid>
    </Grid>
  </React.Fragment>
)

const styles = () => ({
  list: {
    maxHeight: '45vh',
    overflowY: 'auto',
  },
})

export const handleSelectCard = (dispatch, card) => () => dispatch(card)

export const CreditCardComponent = withStyles(styles)(
  ({ cards, classes, creating, error, ...props }) => {
    const [stripeError, setError] = useState(null)
    const [selectedCard, setSelectedCard] = useState(null)
    const showForm = cards.length === 0 || selectedCard === 'new'

    return (
      <form onSubmit={handleSubmit({ selectedCard, setError, ...props })}>
        {cards.length > 0 && (
          <div className={classes.list}>
            <List>
              {cards.map(card => (
                <CreditCardItem
                  key={card.id}
                  brand={card.brand}
                  digits={card.last4}
                  onClick={handleSelectCard(setSelectedCard, card.id)}
                  selected={selectedCard === card.id}
                />
              ))}
              <CreditCardItem
                onClick={handleSelectCard(setSelectedCard, 'new')}
                brand="Use another card"
                selected={selectedCard === 'new'}
              />
            </List>
          </div>
        )}
        {showForm && <CreditCardFields />}

        <div style={{ textAlign: 'center' }}>
          {creating && <CircularProgress color="primary" size={36} />}
          {error && <ErrorComponent>{error}</ErrorComponent>}
          {stripeError && <ErrorComponent>{stripeError}</ErrorComponent>}
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={selectedCard === null}
          fullWidth
        >
          PAY
        </Button>
      </form>
    )
  },
)

export default injectStripe(CreditCardComponent)
