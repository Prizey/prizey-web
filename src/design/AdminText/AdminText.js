import React from 'react'
import { Info } from 'croods'

const AdminText = ({ render, tags = '', ...props }) => {
  let pathTags
  if (Array.isArray(tags)) {
    pathTags = tags.join('&tags[]=')
  }

  return (
    <Info
      id={tags.toString()}
      name="adminText"
      path={`/admin_texts?tags[]=${pathTags || tags}`}
      render={render}
      parseResponse={response => ({
        info: {
          id: tags.toString(),
          ...response.reduce((agg, item) => ({ ...agg, ...item }), {}),
        },
      })}
      disableCache
      {...props}
    />
  )
}

export default AdminText
