import React from 'react'
import { Info } from 'croods'

const AdminText = ({ render, tags = ''}) => {
  console.log('Tags ->', tags)
  return (
  <Info
    id={tags}
    name="adminText"
    path={`/admin_texts?tags[]=${tags}`}
    render={render}
    disableCache
  />
)}

export default AdminText
