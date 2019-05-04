import React, { useState } from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from 'react-stripe-elements'
import { Grid, Button, CircularProgress } from '@material-ui/core'
import 'react-credit-cards/es/styles-compiled.css'

import ErrorComponent from 'design/Error/Error'
import StripeField from 'design/StripeField'

export const handleSubmit = ({
  setError,
  stripe,
  create,
  purchase,
}) => async evt => {
  evt.preventDefault()

  try {
    const result = await stripe.createToken({ type: 'card' })
    if (result.error) {
      setError(result.error.message)
    } else {
      create({
        credit_card_token: result.token.id,
        purchase_option_id: purchase.id,
      })
    }
  } catch (err) {
    setError(err.message)
  }

  return false
}

export const CreditCardComponent = ({ classes, creating, error, ...props }) => {
  const [stripeError, setError] = useState(null)
  return (
    <form onSubmit={handleSubmit({ setError, ...props })}>
      {/* <CardNumberElement /> */}
      <StripeField label="Card Number" component={CardNumberElement} />

      <Grid container spacing={24}>
        <Grid item xs>
          {/* <CardExpiryElement /> */}
          <StripeField label="Expiry (MM / YY)" component={CardExpiryElement} />
        </Grid>
        <Grid item xs>
          {/* <CardCVCElement /> */}
          <StripeField label="CVC" component={CardCVCElement} />
        </Grid>
      </Grid>

      {creating && <CircularProgress color="primary" size={36} />}
      {error && <ErrorComponent>{error}</ErrorComponent>}
      {stripeError && <ErrorComponent>{stripeError}</ErrorComponent>}
      <Button variant="contained" color="primary" type="submit" fullWidth>
        PAY
      </Button>
    </form>
  )
}

export default injectStripe(CreditCardComponent)
