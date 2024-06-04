import React from 'react'
import { StoreProps } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import cn from 'clsx'
import dynamic from 'next/dynamic'
import { SectionSize } from '@dropgala/types'
import { getThumbnail, resolvePath } from '@dropgala/utils/helpers'
import _JSXStyle from 'styled-jsx/style'
import { handleBorderStyle, handleOverlayStyle } from '@dropgala/utils/styles'
import Link from 'next/link'

const NextImage = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

interface Props extends StoreProps {
  data: any
}

const Image: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const data = resolvePath(props, 'data', {})
  const styles = resolvePath(props, 'styles', {})

  const { contentId, thumbnail, link, target } = data
  const { image, placeholder, height, width } = getThumbnail(thumbnail)
  const opacityClassName = `image-banner-opacity-${props.componentId}`
  const imageBannerClassName = `image-banner-${props.componentId}`

  const renderImage = () => {
    return (
      <div className={imageBannerClassName}>
        <div className={opacityClassName}></div>
        <NextImage
          src={image}
          customPlaceholder={placeholder}
          width={width}
          height={height ?? 500}
          objectFit={styles.objectFit?.value}
          className={imageBannerClassName}
        />
      </div>
    )
  }

  return (
    <section
      className={cn(
        'relative group mb-8',
        styles?.sectionSize === SectionSize.AUTO &&
          'max-w-screen-xl xxl:max-w-[1300px] mx-auto',
        styles?.sectionSize === SectionSize.FULL && 'max-w-full',
        'flex justify-center items-center flex-col px-2'
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
      <_JSXStyle id={contentId}>{`
          .${opacityClassName} {
            ${handleOverlayStyle(styles?.overlay, styles?.border)}
          }
          .${imageBannerClassName} {
            position: relative;
            ${handleBorderStyle(styles?.border)}
          }
          `}</_JSXStyle>

      {link ? (
        <Link target={target ?? '_self'} href={link}>
          {renderImage()}
        </Link>
      ) : (
        renderImage()
      )}
    </section>
  )
}

export default Image
