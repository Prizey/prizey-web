import React from 'react'
import { List } from 'croods'
import { Redirect } from '@reach/router'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Layout from 'design/Layout/Layout'

import CreditCardForm from './CreditCardForm'

const getButtonText = (amount, price) =>
  `${amount} Diamond${amount > 1 ? 's' : ''} = $ ${parseFloat(price).toFixed(
    2,
  )}`

const styles = theme => ({
  icon: {
    float: 'left',
    height: theme.spacing.md,
  },
})

export const PaymentInfoComponent = withStyles(styles)(
  ({ classes, purchase = {} }) => (
    <Layout>
      <Typography align="center" variant="h5">
        <img src="/icons/diamond.png" alt="diamond" className={classes.icon} />
        {getButtonText(purchase.ticketAmount, purchase.price)}
      </Typography>

      <CreditCardForm />
    </Layout>
  ),
)

export const reducePurchaseState = (list, id) =>
  list.find(item => item.id === parseInt(id, 10))

export default ({ currentUser, purchaseId }) =>
  currentUser ? (
    <List
      name="purchaseOptions"
      path="/purchase_options"
      render={purchases => (
        <PaymentInfoComponent
          purchase={reducePurchaseState(purchases, purchaseId)}
        />
      )}
    />
  ) : (
    <Redirect to={`/sign-in?next=/payment/${purchaseId}`} noThrow />
  )
