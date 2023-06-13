import type { HeroBannerType } from '@dropgala/types/slider.type'
import cn from 'clsx'
import React, { memo, useState } from 'react'
import Slider from '../common/Slider'
import HeroBannerCard from './hero-banner-card'

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
  const [actualSlide, setActualSlide] = useState(0)

  const updateSlide = ({ currentSlide }: any) => {
    setActualSlide(currentSlide)
  }

  return (
    <div className={cn(className)}>
      {/* @ts-ignore */}
      <Slider {...props} doAfterSlide={updateSlide} slide={actualSlide}>
        {items?.map((banner: any) => (
          <HeroBannerCard
            key={`banner--key${banner.id}`}
            banner={banner}
            className={contentClassName}
          />
        ))}
      </Slider>
      <div className="flex items-center justify-center">
        {items?.length > 1 &&
          items?.map((_, index) => {
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
