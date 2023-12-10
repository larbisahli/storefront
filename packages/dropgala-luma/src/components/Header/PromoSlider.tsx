import { PromoBannerType } from '@dropgala/types/slider.type'
import cn from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { clone, isEmpty } from '@dropgala/utils/lodashFunctions'
import DynamicContent from '../common/DynamicContent'
import { useMemo } from 'react'

interface Props {
  promoBanner: PromoBannerType | null
}

const PromoSlider = ({ promoBanner }: Props) => {
  const { delaySpeed, direction, sliders, backgroundColor } = promoBanner ?? {}

  if (isEmpty(sliders)) return <></>

  const slides = useMemo(
    () => clone(sliders)?.sort((a, b) => a.position - b.position),
    [sliders]
  )

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className="h-[40px] w-screen relative text-white text-center font-medium"
    >
      <Swiper
        dir={direction?.toLocaleLowerCase()}
        loop
        centeredSlides
        autoplay={{
          delay: Number(delaySpeed),
          disableOnInteraction: false
        }}
        modules={[Autoplay]}
        className="h-full"
      >
        {slides?.map(({ content }, idx) => (
          <SwiperSlide key={`banner--key${idx}`}>
            <div
              key={idx}
              className="flex justify-center items-center w-screen h-[40px]"
            >
              <DynamicContent
                tagName="span"
                innerHtml={content}
                attrs={{
                  className:
                    'line-clamp-2 px-1 text-sm lg:text-base leading-[14px]'
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default PromoSlider
