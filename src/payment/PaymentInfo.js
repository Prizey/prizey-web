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
import AdminText from '../design/AdminText/AdminText'

const styles = theme => ({
  icon: {
    height: '18px',
    marginRight: '5px',
  },
  purchase: {
    fontSize: '16px',
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  title: {
    marginTop: `-${theme.spacing.xs}`,
    [theme.breakpoints.up('sm')]: {
      marginTop: `-${theme.spacing.md}`,
    },
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
  ({
    navigate,
    currentUser,
    setCurrentUser,
    cards,
    classes,
    purchase,
    location,
    title,
  }) => (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_TOKEN}>
      <Layout
        location={location}
        currentUser={currentUser}
        leftIcon={<GoBack to="/game" />}
        rightIcon={<ProfileLink />}
      >
        <Typography
          align="center"
          variant="h6"
          component="h1"
          className={classes.title}
        >
          {title}
        </Typography>
        <Typography
          align="center"
          variant="h6"
          component="h2"
          className={classes.purchase}
        >
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
              <CreditCardForm purchase={purchase} cards={cards} {...props} />
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

export const CardListComponent = props => (
  <List
    name="cards"
    disableCache
    render={cards => <PaymentInfoComponent {...props} cards={cards} />}
  />
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
    <AdminText
      tags="credit_card_title"
      renderLoading={() => null}
      render={({ creditCardTitle }) => (
        <List
          name="purchaseOptions"
          path="/purchase_options"
          render={purchases => (
            <CardListComponent
              title={creditCardTitle}
              location={location}
              navigate={navigate}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              purchase={reducePurchaseState(purchases, purchaseId)}
            />
          )}
        />
      )}
    />
  ) : (
    <Redirect to={`/sign-in?next=/payment/${purchaseId}`} noThrow />
  )
