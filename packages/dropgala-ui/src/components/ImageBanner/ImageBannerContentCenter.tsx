import React from 'react'
import { StoreProps, selectConfig } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import dynamic from 'next/dynamic'
import useWindowSize from 'hooks/useWindowSize'
import cn from 'clsx'
import {
  Alignment,
  ModuleGroup,
  SectionSize,
  StoreLayoutComponentContentType
} from '@dropgala/types'
import {
  getComponentFromChildren,
  getThumbnail,
  resolvePath
} from '@dropgala/utils/helpers'
import _JSXStyle from 'styled-jsx/style'
import { handleOverlayStyle } from '@dropgala/utils/styles'

interface Props extends StoreProps {}

const Image = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

const ImageBannerContentCenter: React.FC<Props> = ({
  useAppSelector,
  children,
  ...props
}) => {
  const { device } = useAppSelector(selectConfig)
  const { width } = useWindowSize()

  const data =
    resolvePath<StoreLayoutComponentContentType>(props, 'data', {}) ?? {}
  const styles =
    resolvePath<StoreLayoutComponentContentType>(props, 'styles', {}) ?? {}

  const { image, placeholder } = getThumbnail(data?.thumbnail)

  const renderBannerWidget = () => {
    const BannerWidget = getComponentFromChildren(
      children,
      ModuleGroup.BANNER_WIDGET
    )
    if (!BannerWidget) return null
    return React.cloneElement(BannerWidget, { data: props?.data, styles })
  }

  const imageBorderClassName = `image-${props.componentId}`
  const opacityClassName = `video-banner-opacity-${props.componentId}`

  return (
    <section
      id={props.componentId}
      className={cn(
        'relative group scroll-mt-160px',
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
          .${imageBorderClassName} {
            border-radius: ${styles.imageBorder?.borderRadius}px;
          }
          .${opacityClassName} {
            ${handleOverlayStyle(styles?.overlay, styles?.border)}
          }
          `}</_JSXStyle>
      <figure
        className={cn(
          'relative w-full bg-no-repeat bg-cover bg-center z-0',
          'min-h-[400px] tablet:min-h-[480px] desktop:min-h-[550px]'
        )}
      >
        <div className={cn('-z-10', opacityClassName)}></div>
        <div
          className={cn(
            'absolute h-full top-0 bottom-0 right-0 left-0 overflow-hidden -z-10',
            imageBorderClassName
          )}
          // style={{ zIndex: -1, ...(device.isMobile && { maxWidth: width }) }}
        >
          <Image
            src={image}
            customPlaceholder={placeholder}
            layout="fill"
            objectFit={styles?.objectFit?.value ?? 'cover'}
            className={imageBorderClassName}
          />
        </div>
        <div
          className={cn(
            'absolute top-0 left-0 right-0 bottom-0',
            'z-10 flex m-[15px] justify-center items-center',
            data?.contentAlignment === Alignment.LEFT && '!justify-start',
            data?.contentAlignment === Alignment.CENTER && '!justify-center',
            data?.contentAlignment === Alignment.RIGHT && '!justify-end'
          )}
        >
          {renderBannerWidget()}
        </div>
      </figure>
    </section>
  )
}

export default ImageBannerContentCenter
