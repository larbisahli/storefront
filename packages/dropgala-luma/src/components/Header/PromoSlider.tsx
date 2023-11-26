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

  if (isEmpty(promoBanner)) return <></>

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
        centeredSlides={true}
        autoplay={{
          delay: Number(delaySpeed),
          disableOnInteraction: false
        }}
        loop={true}
        modules={[Autoplay]}
        className="h-full"
      >
        {slides?.map(({ content }, idx) => (
          <SwiperSlide>
            <div
              key={idx}
              className="flex justify-center items-center w-screen h-[40px]"
            >
              <DynamicContent
                tagName="p"
                innerHtml={content}
                attrs={{
                  className: 'calender--dscnt-items--title'
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
