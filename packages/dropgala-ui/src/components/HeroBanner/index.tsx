import type { HeroBannerType } from '@dropgala/types/slider.type'
import React, { memo, useState } from 'react'
import HeroBannerCard from './hero-banner-card'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { StoreProps, selectConfig } from '@dropgala/store'
import dynamic from 'next/dynamic'
import { resolvePath } from '@dropgala/utils/helpers'
import BuilderPlaceholder from '../common/builderPlaceholder'

const SwiperComponent = dynamic(() => import('../common/Swiper'), {
  loading: () => <div className="bg-blue-600 h-2 w-4"></div>,
  ssr: false
})
interface Props {
  useAppSelector: StoreProps['useAppSelector']
  data: {
    items: HeroBannerType[]
  }
}

const HeroSliderBlock: React.FC<Props> = ({
  useAppSelector,
  data,
  ...props
}) => {
  const { device } = useAppSelector(selectConfig)
  const items = resolvePath(data, 'items', {})
  return (
    <section className="relative mx-0 lg:mx-2 mb-7 mt-12 group">
      <BuilderPlaceholder
        {...props}
        isAddAfter
        isAddBefore
        isDuplicate
        isEdit
        isRemove
      />
      <SwiperComponent
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
        items={items}
        // thumbsContainerClass="bg-blue-400"
        // slideThumbActiveClass="bg-red-400"
      >
        {(item: any) => (
          <HeroBannerCard banner={item} className={'py-24'} device={device} />
        )}
      </SwiperComponent>
    </section>
  )
}

export default memo(HeroSliderBlock)
