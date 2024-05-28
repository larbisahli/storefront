import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import dynamic from 'next/dynamic'
import _JSXStyle from 'styled-jsx/style'
import { SectionSize } from '@dropgala/types'
import cn from 'clsx'
import { resolvePath } from '@dropgala/utils/helpers'
import Link from 'next/link'

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
  const { sectionSize } = resolvePath(props, 'styles', {})

  const [, vimeoId] = VIMEO_FORMAT.exec(data.videoUrl) || []
  const [, youtubeId] = YOUTUBE_FORMAT.exec(data.videoUrl) || []

  return (
    <section
      className={cn(
        'relative group',
        sectionSize === SectionSize.AUTO &&
          'max-w-screen-xl xxl:max-w-[1300px] mx-auto',
        sectionSize === SectionSize.FULL && 'max-w-full'
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
          .embedded-video-16-9 {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
          }
          .embedded-video-16-9 iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

      `}</_JSXStyle>
      <div
        className={cn(
          'relative bg-gray-100',
          !data?.displayContent && 'pointer-events-none'
        )}
      >
        {vimeoId && <VimeoVideo videoId={vimeoId} data={data} />}
        {youtubeId && <YouTubeVideo videoId={youtubeId} data={data} />}
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
