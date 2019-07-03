import React from 'react'
import { Info } from 'croods'

const AdminText = ({ render, tags = '' }) => (
  <Info
    id={tags}
    name="adminText"
    path={`/admin_texts?tags[]=${tags}`}
    render={render}
    parseResponse={response => {
      const item = response[0]
      return { info: { id: tags, ...item } }
    }}
    disableCache
  />
)

export default AdminText
