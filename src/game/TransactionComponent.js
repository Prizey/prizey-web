import React from 'react'
import { New } from 'croods'

export default ({ render, afterCreate }) => (
  <New
    name="tickets"
    path="/ticket_transactions"
    render={render}
    afterCreate={afterCreate}
  />
)
