import type { HeroBannerType } from '@dropgala/types/slider.type'
import cn from 'clsx'
import React, { memo, useState } from 'react'
import HeroBannerCard from './hero-banner-card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

interface Props {
  items?: HeroBannerType[]
  className?: string
  contentClassName?: string
}

const createStyles = (isActive: boolean) => ({
  background: 'transparent',
  border: 0,
  color: isActive ? '#333' : '#ccc',
  cursor: 'pointer',
  fontSize: '32px'
})

const HeroSliderBlock: React.FC<Props> = ({
  items = [],
  className = 'mb-7',
  contentClassName = 'py-24',
  ...props
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <div className={cn(className)}>
      <Swiper
        className="max-h-[350px] lg:max-h-[500px]"
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        loop={true}
        pagination={{
          clickable: true
        }}
        modules={[Autoplay, Pagination, Navigation]}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        thumbsContainerClass="bg-blue-400"
        slideThumbActiveClass="bg-red-400"
      >
        {items?.map((banner: any) => (
          <SwiperSlide key={`banner--key${banner.id}`}>
            <HeroBannerCard banner={banner} className={contentClassName} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default memo(HeroSliderBlock)
