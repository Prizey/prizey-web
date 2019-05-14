import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox'

export default ({ selected, brand, digits, onClick }) => (
  <ListItem button onClick={onClick}>
    <ListItemText
      primary={brand}
      secondary={digits && `**** **** **** ${digits}`}
    />
    <ListItemSecondaryAction>
      <Checkbox checked={selected} tabIndex={-1} disableRipple />
    </ListItemSecondaryAction>
  </ListItem>
)
