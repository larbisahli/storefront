import { HeroBannerType } from '@dropgala/types/slider.type'
import cn from 'clsx'
import dynamic from 'next/dynamic'
import type { FC } from 'react'
import { memo } from 'react'

const Image = dynamic(() => import('../../common/Image'))
const Link = dynamic(() => import('../../ui/Link'))

interface BannerProps {
  banner?: HeroBannerType
  className?: string
}

const HeroBannerCard: FC<BannerProps> = ({
  banner,
  className = 'py-20 xy:pt-24'
}) => {
  // const { width } = useWindowSize();
  // @ts-ignore
  const { title, description, thumbnail, btnLabel, destinationUrl, styles } =
    banner

  return (
    <div
      className={cn(
        'w-full bg-no-repeat bg-cover bg-center flex items-center z-0',
        'min-h-[400px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[520px]',
        className
      )}
    >
      <div
        className="absolute h-full w-full overflow-hidden"
        style={{ zIndex: -1 }}
      >
        <Image
          src={thumbnail?.image}
          customPlaceholder={thumbnail?.placeholder}
          layout="fill"
          alt=""
          objectFit="cover"
        />
      </div>
      <div
        className={cn(
          'mx-auto h-full flex flex-col text-center px-6 xl:max-w-[750px] 2xl:max-w-[850px]',
          'max-w-[480px] md:max-w-[550px]'
        )}
      >
        <div className="text-center">
          <h2
            className={cn(
              'text-3xl drop-shadow-xl shadow md:text-4xl font-manrope font-extrabold leading-snug md:leading-tight xl:leading-[1.3em] mb-3 md:mb-4 xl:mb-3 -mt-2 xl:-mt-3 2xl:-mt-4',
              'text-skin-inverted xl:text-5xl 2xl:text-[55px]'
            )}
            style={{
              color: styles?.textColor ?? '#fff'
            }}
          >
            {title}
          </h2>
          <p
            className={cn(
              'text-base md:text-[17px] xl:text-lg leading-7 md:leading-8 xl:leading-[1.92em] xl:px-16 whitespace-normal',
              'text-skin-inverted 2xl:px-32'
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
                'h-[45px] mt-7 md:mt-8 text-sm inline-flex items-center justify-center transition duration-300',
                'rounded px-6 py-2 font-semibold bg-skin-inverted text-skin-base hover:text-skin-inverted hover:bg-skin-primary'
              )}
              style={{
                color: styles?.btnTextColor,
                background: styles?.btnBgc
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
