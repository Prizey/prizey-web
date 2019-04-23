import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'
import { New } from 'croods'
import { withStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import { clearProduct } from 'store/order/actions'

import GoBack from 'design/GoBack/GoBack'
import Layout from 'design/Layout/Layout'
import Caption from 'design/Caption/Caption'

const styles = theme => ({
  icon: {
    height: theme.spacing.md,
  },
  productImage: {
    display: 'block',
    margin: 'auto',
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
    width: '130px',
  },
  quantity: {
    marginLeft: theme.spacing.xs,
    marginRight: theme.spacing.xs,
    width: theme.spacing.sm,
  },
  rightIcon: {
    alignItems: 'center',
    display: 'flex',
    height: theme.spacing.md,
    position: 'absolute',
    right: 0,
  },
})

export const SellItBack = ({ classes, amount, ...props }) => (
  <New
    name="tickets"
    path="/ticket_transactions"
    render={({ create, creating, error }) => (
      <React.Fragment>
        {error && (
          <Typography color="error" align="center" variant="h6">
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => {
            if (!creating) {
              create({ amount })
            }
          }}
        >
          {creating ? (
            <CircularProgress color="inherit" size={30} />
          ) : (
            <React.Fragment>
              <span>SELL IT BACK</span>
              <div className={classes.rightIcon}>
                <img
                  src="/icons/diamond.png"
                  alt="diamond"
                  className={classes.icon}
                />
                <span className={classes.quantity}>3</span>
              </div>
            </React.Fragment>
          )}
        </Button>
      </React.Fragment>
    )}
    afterCreate={() => {
      props.clearProduct()
    }}
  />
)

const InnerComponent = withStyles(styles)(
  ({ product, classes, difficulty, ...props }) =>
    product ? (
      <Layout
        leftIcon={<GoBack to="/" />}
        caption={<Caption difficulty={difficulty} />}
      >
        <Typography align="center" variant="h5">
          {product.title}
        </Typography>

        <img
          alt={product.title}
          src={product.image}
          className={classes.productImage}
        />

        <Typography align="center">MSRP: ${product.price}</Typography>

        <SellItBack
          classes={classes}
          amount={3}
          clearProduct={props.clearProduct}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            // eslint-disable-next-line no-alert
            window.alert(`You claimed the item ${product.title}`)
          }}
        >
          I WANT IT!
        </Button>
      </Layout>
    ) : (
      <Redirect to="/" noThrow />
    ),
)

export const mapState = ({ order = {} }) => ({
  product: order.product,
})

const ClaimProductScreen = connect(
  mapState,
  { clearProduct },
)(props => <InnerComponent {...props} />)

export default ({ currentUser, ...props }) =>
  currentUser ? (
    <ClaimProductScreen {...props} />
  ) : (
    <Redirect to="/sign-in" noThrow />
  )
