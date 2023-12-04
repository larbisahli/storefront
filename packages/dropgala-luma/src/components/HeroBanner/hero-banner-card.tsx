import type { HeroBannerType } from '@dropgala/types/slider.type'
import cn from 'clsx'
import type { FC } from 'react'
import { memo } from 'react'
import Image from '../common/Image'
import Link from '../ui/Link'

interface BannerProps {
  banner: HeroBannerType
  className?: string
}

const HeroBannerCard: FC<BannerProps> = ({
  banner,
  className = 'py-20 xy:pt-24'
}) => {
  const {
    title,
    description,
    thumbnail = [],
    btnLabel,
    destinationUrl,
    styles
  } = banner!

  const { image, placeholder } = thumbnail[0] ?? {}

  return (
    <div
      className={cn(
        'bg-blue-300 relative w-full bg-no-repeat bg-cover bg-center z-0',
        'min-h-[400px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[520px]',
        className
      )}
    >
      <div
        className="absolute max-h-[500px] top-0 bottom-0 right-0 left-0 max-w-[1400px] overflow-hidden"
        style={{ zIndex: -1 }}
      >
        <Image
          src={image}
          customPlaceholder={placeholder}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div
        className={cn(
          'absolute w-full z-50 top-[38%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-start',
          {
            'justify-start': styles?.align === 'left',
            'justify-center': styles?.align === 'center',
            'justify-end': styles?.align === 'right'
          }
        )}
      >
        <div
          className={cn(
            'h-full w-fit flex z-50 flex-col px-5 lg:px-8 xl:max-w-[750px] 2xl:max-w-[850px]',
            'max-w-[480px] md:max-w-[550px] mx-12 h-min'
          )}
        >
          <h2
            className={cn(
              'text-3xl drop-shadow-xl shadow md:text-4xl font-extrabold leading-snug md:leading-tight',
              'xl:leading-[1.3em] mb-3 md:mb-4 xl:mb-3 -mt-2 xl:-mt-3 2xl:-mt-4',
              'text-skin-inverted xl:text-5xl 2xl:text-[65px]'
            )}
            style={{
              color: styles?.textColor ?? '#fff'
            }}
          >
            {title}
          </h2>
          <p
            className={cn(
              'text-base md:text-[17px] xl:text-lg leading-7 md:leading-8 xl:leading-[1.92em] whitespace-normal',
              'text-skin-inverted',
              {
                'text-center': styles?.align === 'center',
                'text-end': styles?.align === 'right'
              }
            )}
            style={{
              color: styles?.textColor ?? '#fff'
            }}
          >
            {description}
          </p>
          {btnLabel && (
            <Link
              href={destinationUrl ?? '/'}
              className={cn(
                'h-[45px] w-fit mt-2 text-sm inline-flex items-center justify-center transition duration-300 uppercase leading-4',
                'rounded-sm px-6 py-2 font-semibold bg-skin-inverted text-skin-base hover:text-skin-inverted hover:bg-skin-primary'
              )}
              style={{
                color: styles?.btnTextColor ?? '#222',
                background: styles?.btnBgc ?? '#fff'
              }}
              target="_blank"
            >
              {btnLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(HeroBannerCard)
