import React from 'react'

import Field from 'design/Field'

export default () => (
  <Field
    label="Nome"
    input={{ name: 'name' }}
    meta={{ error: null, touched: false }}
  />
)
