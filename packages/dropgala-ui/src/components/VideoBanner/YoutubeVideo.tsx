import React from 'react'
import YouTube from 'react-youtube'

interface Props {
  videoId: string
  data: any
}

const YoutubeVideo: React.FC<Props> = ({ videoId, data }) => {
  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      loop: Number(data?.loop),
      autoplay: data?.autoplay,
      controls: Number(data?.controls),
      mute: Number(data?.mute)
    }
  }
  return (
    <YouTube
      videoId={videoId}
      className="w-full h-full embedded-video-16-9"
      opts={opts}
    />
  )
}

export default YoutubeVideo
