import { Autoplay } from 'swiper/modules'
import { clone } from '@dropgala/utils/lodashFunctions'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { StoreProps } from '@dropgala/store'
import cn from 'clsx'
import BuilderPlaceholder from '../common/builderPlaceholder'
import { resolvePath } from '@dropgala/utils/helpers'
import {
  SectionSize,
  StoreLayoutComponentContentType,
  StoreLayoutComponentStylesType
} from '@dropgala/types'
import _JSXStyle from 'styled-jsx/style'
import { handleBorderStyle } from '@dropgala/utils/styles'

const SwiperComponent = dynamic(() => import('../common/Swiper'), {
  loading: () => <div className="bg-blue-600 h-2 w-4"></div>,
  ssr: false
})

const DynamicContent = dynamic(() => import('../common/DynamicContent'), {
  loading: () => <div className="bg-blue-600 h-2 w-4"></div>,
  ssr: false
})

interface Props extends StoreProps {}

const PromoBanner = ({ ...props }: Props) => {
  const data = resolvePath<StoreLayoutComponentContentType>(props, 'data', {})

  const {
    delaySpeed,
    animationSpeed,
    langDirection,
    loop,
    direction,
    slidesPerView,
    draggable,
    items,
    backgroundColor
  } = data ?? {}

  const styles = resolvePath<StoreLayoutComponentStylesType>(
    props,
    'styles',
    {}
  )

  const slides = useMemo(
    () => clone(items)?.sort((a, b) => a.position - b.position),
    [items]
  )

  const promoBannerClass = `promo-banner-${props.componentId}`

  return (
    <section
      id={props.componentId}
      style={{ backgroundColor: backgroundColor }}
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
          .${promoBannerClass} {
            background: ${styles?.backgroundColor};
            ${handleBorderStyle(styles?.border)}
          }
          `}</_JSXStyle>
      <div
        className={cn(
          'h-[40px] text-white text-center font-medium',
          promoBannerClass
        )}
      >
        <SwiperComponent
          dir={langDirection?.value?.toLocaleLowerCase()}
          loop={loop}
          speed={animationSpeed.value ?? 500}
          autoplay={{
            delay: delaySpeed.value ?? 2000,
            disableOnInteraction: false
          }}
          scrollbar={{ draggable }}
          modules={[Autoplay]}
          slidesPerView={slidesPerView}
          // effect="fade"
          direction={direction}
          className="h-full"
          centeredSlides
          items={slides}
          // grabCursor
        >
          {(item: { content: string }) => (
            <div className="flex justify-center items-center h-[40px]">
              <DynamicContent
                tagName="span"
                innerHtml={item?.content}
                attrs={{
                  className:
                    'line-clamp-2 px-1 text-sm lg:text-base leading-[20px]'
                }}
              />
            </div>
          )}
        </SwiperComponent>
      </div>
    </section>
  )
}

export default PromoBanner
