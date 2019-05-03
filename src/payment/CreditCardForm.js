import React, { useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import Card from 'react-credit-cards'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button, CircularProgress } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'

import 'react-credit-cards/es/styles-compiled.css'

import MaskedInputField from 'design/MaskedField'
import ErrorComponent from 'design/Error/Error'

import {
  inputMasks,
  validateCardNumber,
  validateExpiry,
} from './creditCardHelpers'

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
})

const gridFields = [
  {
    label: 'Expires at',
    mask: inputMasks.expiry,
    name: 'expiry',
    validate: value => {
      if (isEmpty(value)) {
        return 'required field'
      }

      return validateExpiry(value) || 'invalid expiry'
    },
  },
  {
    label: 'CVV',
    mask: inputMasks.cvc,
    name: 'cvc',
    validate: value => isEmpty(value) && 'required field',
  },
]

const CreditCardComponent = ({
  classes,
  onSubmit,
  submitting,
  submitError,
}) => {
  const [focused, setFocused] = useState(null)

  return (
    <Formik
      initialValues={{
        cvc: '',
        expiry: '',
        number: '',
      }}
      onSubmit={onSubmit}
      render={({ values }) => (
        <Form>
          <div className={classes.card}>
            <Card
              number={values.number}
              name=""
              expiry={values.expiry}
              cvc={values.cvc}
              focused={focused}
              placeholders={{ name: '' }}
            />
          </div>

          <Field
            component={MaskedInputField}
            name="number"
            label="Card number"
            type="text"
            mask={inputMasks.number}
            onFocus={() => setFocused('number')}
            validate={value => {
              if (isEmpty(value)) {
                return 'required field'
              }

              return validateCardNumber(value) || 'invalid number'
            }}
          />

          <Grid container spacing={24}>
            {gridFields.map((field, idx) => (
              <Grid item xs key={idx}>
                <Field
                  component={MaskedInputField}
                  name={field.name}
                  label={field.label}
                  type="text"
                  mask={field.mask}
                  onFocus={() => setFocused(field.name)}
                  validate={field.validate}
                />
              </Grid>
            ))}
          </Grid>

          {submitting && <CircularProgress color="primary" size={36} />}
          {submitError && <ErrorComponent>{submitError}</ErrorComponent>}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            PAY
          </Button>
        </Form>
      )}
    />
  )
}

export default withStyles(styles)(CreditCardComponent)
