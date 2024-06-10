import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import dynamic from 'next/dynamic'
import _JSXStyle from 'styled-jsx/style'
import { SectionSize } from '@dropgala/types'
import cn from 'clsx'
import { resolvePath } from '@dropgala/utils/helpers'
import Link from 'next/link'
import { handleOverlayStyle } from '@dropgala/utils/styles'

const YouTubeVideo = dynamic(() => import('./YoutubeVideo'), {
  loading: () => <></>,
  ssr: false
})

const VimeoVideo = dynamic(() => import('./VimeoVideo'), {
  loading: () => <></>,
  ssr: false
})

interface Props extends StoreProps {
  data: any
}

const VIMEO_FORMAT = /(?:https?\/\/)?vimeo.com[\w/]*\/(\d+)$/
const YOUTUBE_FORMAT = /(?:https?\/\/)?www.youtube.com\/watch\?v=([\w-]+)/

const VideoBanner: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const data = resolvePath(props, 'data', {})
  const styles = resolvePath(props, 'styles', {})

  const [, vimeoId] = VIMEO_FORMAT.exec(data.videoUrl) || []
  const [, youtubeId] = YOUTUBE_FORMAT.exec(data.videoUrl) || []

  const videoBannerClass = `video-banner-${props.componentId}`
  const opacityClassName = `video-banner-opacity-${props.componentId}`

  return (
    <section
      className={cn(
        'relative group',
        styles?.sectionSize === SectionSize.AUTO && 'max-w-default mx-auto',
        styles?.sectionSize === SectionSize.FULL && 'max-w-full'
      )}
    >
      <BuilderPlaceholder
        {...props}
        isEdit
        isRemove
        isAddBefore
        isAddAfter
        isDuplicate
      />
      <_JSXStyle id={data.contentId}>{`
          .${videoBannerClass} {
            position: relative;
          }
          .${opacityClassName} {
            ${handleOverlayStyle(styles?.overlay, styles?.border)}
          }
          `}</_JSXStyle>
      <div
        className={cn(
          'relative bg-gray-100',
          !data?.displayContent && 'pointer-events-none'
        )}
      >
        <div className={opacityClassName}></div>
        {vimeoId && (
          <VimeoVideo
            videoId={vimeoId}
            data={data}
            componentId={props.componentId}
          />
        )}
        {youtubeId && (
          <YouTubeVideo
            videoId={youtubeId}
            data={data}
            styles={styles}
            componentId={props.componentId}
          />
        )}
        {data?.displayContent && (
          <div
            className={cn(
              'bg-black bg-opacity-10 absolute top-0 left-0 right-0 bottom-0',
              'flex flex-col justify-center items-center'
            )}
          >
            <div className="flex flex-col justify-center items-center bg-gray-200 p-4 border rounded-lg">
              <h2 className="font-semibold text-2xl">{data?.header}</h2>
              <p className="text-center">{data?.text}</p>
              <Link
                href={data?.btnLink}
                className="text-center px-4 py-3 bg-black text-white border rounded-md"
              >
                {data?.btnLabel}
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default VideoBanner
