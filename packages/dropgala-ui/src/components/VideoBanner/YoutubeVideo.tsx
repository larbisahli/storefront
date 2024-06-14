import React from 'react'
import YouTube from 'react-youtube'
import cn from 'clsx'
import _JSXStyle from 'styled-jsx/style'
import { handleBorderStyle } from '@dropgala/utils/styles'
import {
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'

interface Props {
  videoId: string
  data: StoreLayoutComponentContentType
  styles: StoreLayoutComponentStylesType
  componentId: string
}

const YoutubeVideo: React.FC<Props> = ({
  videoId,
  data,
  styles,
  componentId
}) => {
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

  const embeddedClassName = `embedded-video-16-9-${componentId}`

  return (
    <>
      <_JSXStyle id={`youtube-${data.contentId}`}>{`
          .${embeddedClassName} {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
          }
          .${embeddedClassName} iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            ${handleBorderStyle(styles?.border)}
          }

      `}</_JSXStyle>
      <YouTube
        videoId={videoId}
        className={cn('w-full h-full', embeddedClassName)}
        opts={opts}
      />
    </>
  )
}

export default YoutubeVideo
