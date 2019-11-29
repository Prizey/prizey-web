import React from 'react'
import AdminText from 'design/AdminText/AdminText'
import Video from './Video'

const tags = ['video_embed_url', 'video_redirect_url', 'video_text']

export default props => (
  <AdminText
    tags={tags}
    render={info => (
      <Video
        videoEmbedUrl={info.videoEmbedUrl}
        videoRedirectUrl={info.videoRedirectUrl}
        videoText={info.videoText}
        {...props}
      />
    )}
  />
)
