import React from 'react'
import { New, List } from 'croods'
import { StripeProvider, Elements } from 'react-stripe-elements'
import { Redirect } from '@reach/router'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Layout from 'design/Layout/Layout'

import GoBack from 'design/GoBack/GoBack'
import ProfileLink from 'design/ProfileLink/ProfileLink'
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

export const afterPurchase = ({
  navigate,
  currentUser,
  setCurrentUser,
  purchase,
}) => () => {
  setCurrentUser({
    ...currentUser,
    tickets: currentUser.tickets + purchase.ticketAmount,
  })
  return navigate('/game')
}

export const PaymentInfoComponent = withStyles(styles)(
  ({ navigate, currentUser, setCurrentUser, classes, purchase, location }) => (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_TOKEN}>
      <Layout
        location={location}
        currentUser={currentUser}
        leftIcon={<GoBack to="/buy-diamonds" />}
        rightIcon={<ProfileLink />}
      >
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
          afterCreate={afterPurchase({
            currentUser,
            navigate,
            purchase,
            setCurrentUser,
          })}
        />
      </Layout>
    </StripeProvider>
  ),
)

export const reducePurchaseState = (list, id) =>
  list.find(item => item.id === parseInt(id, 10))

export default ({
  navigate,
  currentUser,
  setCurrentUser,
  purchaseId,
  location,
}) =>
  currentUser ? (
    <List
      name="purchaseOptions"
      path="/purchase_options"
      render={purchases => (
        <PaymentInfoComponent
          location={location}
          navigate={navigate}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          purchase={reducePurchaseState(purchases, purchaseId)}
        />
      )}
    />
  ) : (
    <Redirect to={`/sign-in?next=/payment/${purchaseId}`} noThrow />
  )
