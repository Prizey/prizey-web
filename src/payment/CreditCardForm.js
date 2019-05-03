import React, { useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import Card from 'react-credit-cards'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button, CircularProgress } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'

import 'react-credit-cards/es/styles-compiled.css'

import InputField from 'design/Field'
import ErrorComponent from 'design/Error/Error'

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
})

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
        cvv: '',
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
              cvc={values.cvv}
              focused={focused}
              placeholders={{ name: '' }}
            />
          </div>

          <Field
            component={InputField}
            name="number"
            label="Card number"
            type="text"
            onFocus={() => setFocused('number')}
            validate={value => isEmpty(value) && 'required field'}
          />

          <Grid container spacing={24}>
            <Grid item xs>
              <Field
                component={InputField}
                name="expiry"
                label="Expires at"
                type="text"
                onFocus={() => setFocused('expiry')}
                validate={value => isEmpty(value) && 'required field'}
              />
            </Grid>
            <Grid item xs>
              <Field
                component={InputField}
                name="cvv"
                label="CVV"
                type="text"
                onFocus={() => setFocused('cvc')}
                validate={value => isEmpty(value) && 'required field'}
              />
            </Grid>
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
