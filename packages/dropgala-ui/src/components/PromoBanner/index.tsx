import { Autoplay } from 'swiper/modules'
import { clone } from '@dropgala/utils/lodashFunctions'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { StoreProps } from '@dropgala/store'
import cn from 'clsx'
import BuilderPlaceholder from '../common/builderPlaceholder'

const SwiperComponent = dynamic(() => import('../common/Swiper'), {
  loading: () => <div className="bg-blue-600 h-2 w-4"></div>,
  ssr: false
})

const DynamicContent = dynamic(() => import('../common/DynamicContent'), {
  loading: () => <div className="bg-blue-600 h-2 w-4"></div>,
  ssr: false
})

interface Props extends StoreProps {}

const PromoBanner = ({ data, ...props }: Props) => {
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

  console.log({ data })

  const slides = useMemo(
    () => clone(items)?.sort((a, b) => a.position - b.position),
    [items]
  )

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className="relative h-[40px] w-screen text-white text-center font-medium group"
    >
      <BuilderPlaceholder {...props} isEdit isRemove isEditRemoveBottom />
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
          <div className="flex justify-center items-center w-screen h-[40px]">
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
  )
}

export default PromoBanner
