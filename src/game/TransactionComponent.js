import React from 'react'
import { New } from 'croods'

export const createWithSource = (source, create) => data => {
  create({
    ...data,
    source,
  })
}

export default ({ source, render, afterCreate }) => (
  <New
    name="tickets"
    path="/ticket_transactions"
    render={({ create, ...props }) =>
      render({
        create: createWithSource(source, create),
        ...props,
      })
    }
    afterCreate={afterCreate}
  />
)
