import { PromoBannerType } from '@dropgala/types/slider.type'
import cn from 'clsx'
import { useMemo } from 'react'

interface Props {
  promoBanner: PromoBannerType | null
}

const PromoSlider = ({ promoBanner }: Props) => {
  const { animationSpeed, direction, sliders, backgroundColor } =
    promoBanner ?? {}

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className="h-[40px] w-screen relative text-white text-center font-medium"
    >
      <div
        style={{ animationDuration: animationSpeed }}
        className={cn(
          'flex absolute left-0',
          { 'animate-marquee2-infinite': direction === 'LTR' },
          { 'animate-marquee-infinite': direction === 'RTL' }
        )}
      >
        {sliders?.map(({ text, textColor }, idx) => (
          <div
            key={idx}
            style={{ color: textColor }}
            className="flex justify-center items-center w-screen h-[40px]"
          >
            <span className="h-fit text-xl">{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PromoSlider
