import React, { memo } from 'react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { StoreProps } from '@dropgala/store'
import dynamic from 'next/dynamic'
import {
  getComponentFromChildren,
  getThumbnail,
  resolvePath
} from '@dropgala/utils/helpers'
import BuilderPlaceholder from '../common/builderPlaceholder'
import { Alignment, ModuleGroup, SectionSize } from '@dropgala/types'
import cn from 'clsx'
import _JSXStyle from 'styled-jsx/style'
import { handleOverlayStyle } from '@dropgala/utils/styles'

const SwiperComponent = dynamic(() => import('../common/Swiper'), {
  loading: () => <div className="bg-blue-600 h-2 w-4"></div>,
  ssr: false
})

const Image = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

interface Props extends StoreProps {}

const HeroCarousel: React.FC<Props> = ({
  useAppSelector,
  data,
  styles,
  children,
  ...props
}) => {
  const slides = resolvePath<any[]>(data, 'slides', [])
  const sliderConfiguration = resolvePath<any>(data, 'sliderConfiguration', {})

  const { loop, langDirection, delaySpeed, animationSpeed, draggable } =
    sliderConfiguration

  const renderBannerWidget = (slide: any) => {
    const BannerWidget = getComponentFromChildren(
      children,
      ModuleGroup.BANNER_WIDGET
    )
    if (!BannerWidget) return null
    return React.cloneElement(BannerWidget, { data: slide, styles })
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
        isAddAfter
        isAddBefore
        isDuplicate
        isEdit
        isRemove
      />
      <_JSXStyle id={data.contentId}>{`
          .${imageBorderClassName} {
            border-radius: ${styles.imageBorder?.borderRadius}px;
          }
          .${opacityClassName} {
            ${handleOverlayStyle(styles?.overlay, styles?.border)}
          }
      `}</_JSXStyle>
      <SwiperComponent
        // className="max-h-[350px] desktop:max-h-[500px]"
        dir={langDirection?.value?.toLocaleLowerCase()}
        pagination={{
          dynamicBullets: true
        }}
        items={slides}
        loop={loop}
        speed={animationSpeed?.value ?? 500}
        autoplay={{
          delay: delaySpeed?.value ?? 2000,
          disableOnInteraction: false
        }}
        scrollbar={{ draggable }}
        modules={[Pagination, Autoplay, Navigation]}
        centeredSlides
      >
        {(slide: any, idx: number) => {
          const { image, placeholder } = getThumbnail(slide.thumbnail)
          return (
            <figure
              key={idx}
              className={cn(
                'relative w-full bg-no-repeat bg-cover bg-center z-0',
                'min-h-[400px] desktop:min-h-[550px]'
              )}
            >
              <div className={cn('-z-10', opacityClassName)}></div>
              <div
                className={cn(
                  'absolute h-full top-0 bottom-0 right-0 left-0 overflow-hidden -z-10',
                  imageBorderClassName
                )}
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
                  data?.contentAlignment === Alignment.RIGHT &&
                    '!justify-start',
                  data?.contentAlignment === Alignment.CENTER &&
                    '!justify-center',
                  data?.contentAlignment === Alignment.LEFT && '!justify-end'
                )}
              >
                {slide?.displayContent && renderBannerWidget(slide)}
              </div>
            </figure>
          )
        }}
      </SwiperComponent>
    </section>
  )
}

export default memo(HeroCarousel)
