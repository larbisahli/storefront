import React from 'react'
import Vimeo from 'react-vimeo'

interface Props {
  videoId: string
  data: any
}

const VimeoVideo: React.FC<Props> = ({ videoId, data }) => {
  return <Vimeo videoId={videoId} autoplay />
}

export default VimeoVideo
