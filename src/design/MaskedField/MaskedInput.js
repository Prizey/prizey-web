import React from 'react'
import InputMask from 'react-text-mask'

export default ({ inputRef, ...other }) => (
  <InputMask
    {...other}
    guide={false}
    ref={ref => {
      inputRef && inputRef(ref ? ref.inputElement : null)
    }}
  />
)
