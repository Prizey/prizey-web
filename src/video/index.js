import React from 'react'
import capitalize from 'lodash/capitalize'
import AdminText from 'design/AdminText/AdminText'
import Video from './Video'

export const getTag = (obj, tagName, tagSufix) =>
  obj[tagName + capitalize(tagSufix)] || obj[tagName]

export default ({ pageId, ...props }) => {
  const tags = ['video_embed_url', 'video_redirect_url', 'video_text']
  if (pageId) {
    tags.push(
      `video_embed_url_${pageId}`,
      `video_redirect_url_${pageId}`,
      `video_text_${pageId}`,
    )
  }

  return (
    <AdminText
      tags={tags}
      render={info => {
        const videoEmbedUrl = getTag(info, 'videoEmbedUrl', pageId)
        const videoRedirectUrl = getTag(info, 'videoRedirectUrl', pageId)
        const videoText = getTag(info, 'videoText', pageId)

        return (
          <Video
            videoEmbedUrl={videoEmbedUrl}
            videoRedirectUrl={videoRedirectUrl}
            videoText={videoText}
            {...props}
          />
        )
      }}
    />
  )
}
