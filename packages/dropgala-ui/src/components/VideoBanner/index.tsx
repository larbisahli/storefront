import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import dynamic from 'next/dynamic'
import _JSXStyle from 'styled-jsx/style'
import {
  ModuleGroup,
  SectionSize,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import cn from 'clsx'
import { getComponentFromChildren, resolvePath } from '@dropgala/utils/helpers'
import { handleOverlayStyle } from '@dropgala/utils/styles'

const YouTubeVideo = dynamic(() => import('./YoutubeVideo'), {
  loading: () => <></>,
  ssr: false
})

const VimeoVideo = dynamic(() => import('./VimeoVideo'), {
  loading: () => <></>,
  ssr: false
})

interface Props extends StoreProps {}

const VIMEO_FORMAT = /(?:https?\/\/)?vimeo.com[\w/]*\/(\d+)$/
const YOUTUBE_FORMAT = /(?:https?\/\/)?www.youtube.com\/watch\?v=([\w-]+)/

const VideoBanner: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const data = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})
  const styles = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )

  const [, vimeoId] = VIMEO_FORMAT.exec(data.videoUrl) || []
  const [, youtubeId] = YOUTUBE_FORMAT.exec(data.videoUrl) || []

  const videoBannerClass = `video-banner-${props.componentId}`
  const opacityClassName = `video-banner-opacity-${props.componentId}`

  const renderBannerWidget = () => {
    const BannerWidget = getComponentFromChildren(
      children,
      ModuleGroup.BANNER_WIDGET
    )
    if (!BannerWidget) return null
    return React.cloneElement(BannerWidget, { data })
  }

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
      <figure
        className={cn(
          'relative bg-gray-100',
          !data?.displayContent && 'pointer-events-none'
        )}
      >
        <div className={cn('-z-10', opacityClassName)}></div>
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
        <div
          className={cn(
            'absolute top-0 left-0 right-0 bottom-0',
            'z-10 flex flex-col justify-center items-center'
          )}
        >
          {data?.displayContent && renderBannerWidget()}
        </div>
      </figure>
    </section>
  )
}

export default VideoBanner
