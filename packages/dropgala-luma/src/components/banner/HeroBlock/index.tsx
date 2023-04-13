import { HeroBannerType } from '@dropgala/types/slider.type'
import cn from 'clsx'
import dynamic from 'next/dynamic'
import React, { memo, useState } from 'react'

import HeroBannerCard from './hero-banner-card'

const Slider = dynamic(() => import('../../Slider'))

interface Props {
  heroBanners?: HeroBannerType[]
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
  // heroBanners,
  className = 'mb-7',
  contentClassName = 'py-24',
  ...props
}) => {
  const [actualSlide, setActualSlide] = useState(0)

  const updateSlide = ({ currentSlide }: any) => {
    setActualSlide(currentSlide)
  }

  const heroBanners = [
    {
      thumbnail: { image: '/image.webp' },
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur',
      btnLabel: 'See More',
      title: 'Lorem ipsum dolor'
    },
    {
      thumbnail: { image: '/image.webp' }
    },
    {
      thumbnail: { image: '/image.webp' }
    },
    {
      thumbnail: { image: '/image.webp' }
    }
  ]

  console.log({ props })

  return (
    <div className={cn(className)}>
      <Slider {...props} doAfterSlide={updateSlide} slide={actualSlide}>
        {heroBanners?.map((banner: any) => (
          <HeroBannerCard
            key={`banner--key${banner.id}`}
            banner={banner}
            className={contentClassName}
          />
        ))}
      </Slider>
      <div className="flex items-center justify-center">
        {heroBanners.map((_, index) => {
          return (
            <button
              key={index}
              style={createStyles(index === actualSlide)}
              onClick={() => updateSlide({ currentSlide: index })}
            >
              &bull;
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default memo(HeroSliderBlock)
