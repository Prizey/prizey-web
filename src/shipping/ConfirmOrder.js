import React from 'react'
import { connect } from 'react-redux'
import { New } from 'croods'
import { withStyles } from '@material-ui/core/styles'
import { Button, Typography, CircularProgress } from '@material-ui/core'
import { Redirect } from '@reach/router'

import Layout from 'design/Layout/Layout'
import ErrorComponent from 'design/Error/Error'
import PlayAgain from 'design/PlayAgain'

import { fieldList } from 'auth/UserForm'

const styles = theme => ({
  field: {
    marginTop: theme.spacing.sm,
  },
  title: {
    marginTop: parseInt(theme.spacing.lg, 10) * -0.5,
  },
  value: {
    opacity: 0.8,
  },
})

export const handleCancel = navigate => () => navigate('/')
export const handleShipIt = (product = {}, create) => () =>
  create({ productId: product.id || 0 })

export const handleAfterCreate = navigate => () =>
  navigate('/shipping-confirmation')

export const mapState = ({ basket = {} }) => ({
  product: basket.product,
})

class ConfirmOrderComponent extends React.Component {
  state = {
    dialogIsOpen: false,
  }

  render() {
    const {
      product,
      create,
      creating,
      error,
      navigate,
      classes,
      currentUser,
    } = this.props

    if (!currentUser) {
      return <Redirect to="/sign-in" noThrow />
    }

    return (
      <Layout>
        <PlayAgain
          isOpen={this.state.dialogIsOpen}
          close={() => this.setState({ dialogIsOpen: false })}
          confirm={handleCancel(navigate)}
        >
          This action can&apos;t be undone.
        </PlayAgain>

        <Typography align="center" variant="h5" className={classes.title}>
          Confirm Order
        </Typography>

        {fieldList.map(field => (
          <Typography
            key={field.name}
            className={classes.field}
            variant="body2"
          >
            {field.label}:{' '}
            <span className={classes.value}>{currentUser[field.name]}</span>
          </Typography>
        ))}

        <div style={{ textAlign: 'center' }}>
          {creating && <CircularProgress color="primary" size={36} />}
          {error && <ErrorComponent>{error}</ErrorComponent>}
        </div>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleShipIt(product, create)}
        >
          SHIP IT!
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => this.setState({ dialogIsOpen: true })}
        >
          CANCEL
        </Button>
      </Layout>
    )
  }
}

export const ConfirmOrderScreen = withStyles(styles)(ConfirmOrderComponent)

export default connect(
  mapState,
  null,
)(props => (
  <New
    name="orders"
    render={renderProps => <ConfirmOrderScreen {...props} {...renderProps} />}
    afterCreate={handleAfterCreate(props.navigate)}
  />
))
