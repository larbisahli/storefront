import type { HeroBannerType } from '@dropgala/types/slider.type'
import cn from 'clsx'
import React, { memo, useState } from 'react'
import HeroBannerCard from './hero-banner-card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { StoreProps, selectConfig } from '@dropgala/store'

interface Props {
  useAppSelector: StoreProps['useAppSelector']
  fields: {
    data: {
      items: HeroBannerType[]
    }
  }
}

const HeroSliderBlock: React.FC<Props> = ({ useAppSelector, fields }) => {
  const { device } = useAppSelector(selectConfig)
  const items = fields?.data?.items
  return (
    <div className={cn('mx-0 lg:mx-2 mb-7')}>
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
        // thumbsContainerClass="bg-blue-400"
        // slideThumbActiveClass="bg-red-400"
      >
        {items?.map((banner: any) => (
          <SwiperSlide key={`hero-banner--key${banner.id}`}>
            <HeroBannerCard
              banner={banner}
              className={'py-24'}
              device={device}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default memo(HeroSliderBlock)
