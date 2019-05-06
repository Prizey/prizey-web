import React from 'react'
import { New, List } from 'croods'
import { StripeProvider, Elements } from 'react-stripe-elements'
import { Redirect } from '@reach/router'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Layout from 'design/Layout/Layout'

import GoBack from 'design/GoBack/GoBack'
import CreditCardForm from './CreditCardForm'

import getPurchaseDetail from './purchaseDescription'

const styles = theme => ({
  icon: {
    float: 'left',
    height: theme.spacing.md,
  },
  purchase: {
    marginBottom: theme.spacing.md,
  },
})

export const afterPurchase = navigate => () => navigate('/')

export const PaymentInfoComponent = withStyles(styles)(
  ({ navigate, classes, purchase }) => (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_TOKEN}>
      <Layout leftIcon={<GoBack to="/buy-diamonds" />}>
        <Typography align="center" variant="h5" className={classes.purchase}>
          <img
            src="/icons/diamond.png"
            alt="diamond"
            className={classes.icon}
          />
          {getPurchaseDetail(purchase.ticketAmount, purchase.price)}
        </Typography>

        <New
          name="payments"
          render={props => (
            <Elements>
              <CreditCardForm purchase={purchase} {...props} />
            </Elements>
          )}
          afterCreate={afterPurchase(navigate)}
        />
      </Layout>
    </StripeProvider>
  ),
)

export const reducePurchaseState = (list, id) =>
  list.find(item => item.id === parseInt(id, 10))

export default ({ navigate, currentUser, purchaseId }) =>
  currentUser ? (
    <List
      name="purchaseOptions"
      path="/purchase_options"
      render={purchases => (
        <PaymentInfoComponent
          navigate={navigate}
          purchase={reducePurchaseState(purchases, purchaseId)}
        />
      )}
    />
  ) : (
    <Redirect to={`/sign-in?next=/payment/${purchaseId}`} noThrow />
  )
