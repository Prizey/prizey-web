import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { required } from 'redux-form-validators'
import { reduxForm, Field } from 'redux-form'

import InputField from 'design/Field'
import ErrorComponent from 'design/Error/Error'

const fieldList = [
  { label: 'Full Name', name: 'fullname' },
  { label: 'Address', name: 'address' },
  { label: 'City', name: 'city' },
  { label: 'State / Province / Region', name: 'stateProvinceRegion' },
  { label: 'Postal Code / ZIP', name: 'zipcode' },
  { label: 'Clothing Size', name: 'clothingSize' },
  { label: 'Shoe Size', name: 'shoeSize' },
]

const styles = theme => ({
  root: {
    marginTop: theme.spacing.sm,
  },
})

export const UserForm = withStyles(styles)(props => (
  <form
    onSubmit={props.handleSubmit(props.onSubmit)}
    className={props.classes.root}
  >
    {fieldList.map(field => (
      <Field
        key={field.name}
        component={InputField}
        name={field.name}
        label={field.label}
        type="text"
        validate={[required()]}
      />
    ))}

    <div style={{ textAlign: 'center' }}>
      {props.submitting && <CircularProgress color="primary" size={36} />}
      {props.submitError && (
        <ErrorComponent>{props.submitError}</ErrorComponent>
      )}

      {props.error && <ErrorComponent>{props.error}</ErrorComponent>}
    </div>

    {props.renderButton && props.renderButton(props)}
  </form>
))

export default reduxForm({ form: 'user' })(UserForm)
