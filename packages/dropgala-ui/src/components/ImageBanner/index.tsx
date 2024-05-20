import React from 'react'
import { StoreProps, selectConfig } from '@dropgala/store'
import BuilderPlaceholder from '../common/builderPlaceholder'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import useWindowSize from 'hooks/useWindowSize'
import cn from 'clsx'
import { Alignment, SectionSize, TextSize } from '@dropgala/types'

interface Props extends StoreProps {
  data: any
}

const Image = dynamic(() => import('../common/Image'), {
  loading: () => <></>,
  ssr: false
})

const ImageBanner: React.FC<Props> = ({ useAppSelector, ...props }) => {
  const { device } = useAppSelector(selectConfig)
  const { width } = useWindowSize()
  const {
    image,
    placeholder,
    header,
    text,
    btnLabel,
    sectionSize,
    headerSize,
    contentAlignment,
    headerColor,
    textColor,
    btnBgColor,
    btnTextColor,
    objectFit = 'cover',
    borderRadius = 'lg',
    btnLink
  } = props?.data ?? {}
  const radius =
    sectionSize === SectionSize.AUTO
      ? `rounded-${borderRadius}`
      : `rounded-none`
  return (
    <section
      className={cn(
        'relative group mb-8',
        sectionSize === SectionSize.AUTO &&
          'max-w-screen-xl xxl:max-w-[1300px] mx-auto',
        sectionSize === SectionSize.FULL && 'max-w-full'
      )}
    >
      <BuilderPlaceholder
        {...props}
        isEdit
        isRemove
        isAddBefore
        isAddAfter
        isDuplicate
      />
      <div
        className={cn(
          'relative w-full bg-no-repeat bg-cover bg-center z-0',
          'min-h-[400px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[520px]'
        )}
      >
        <div
          className={cn(
            'absolute h-full top-0 bottom-0 right-0 left-0 overflow-hidden',
            radius
          )}
          style={{ zIndex: -1, ...(device.isMobile && { maxWidth: width }) }}
        >
          <Image
            src={image}
            customPlaceholder={placeholder}
            layout="fill"
            objectFit={objectFit}
            className={cn('bg-skin-thumbnail', radius)}
          />
        </div>
        <div
          className={cn(
            'absolute w-full z-50 top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex',
            {
              'justify-start': contentAlignment === Alignment.LEFT,
              'justify-center': contentAlignment === Alignment.CENTER,
              'justify-end': contentAlignment === Alignment.RIGHT
            }
          )}
        >
          <div
            className={cn(
              'h-full w-fit flex z-50 flex-col px-5 lg:px-2 xl:max-w-[750px] 2xl:max-w-[850px]',
              'max-w-[480px] md:max-w-[550px] mx-0 lg:mx-12 h-min',
              {
                'items-start': contentAlignment === Alignment.LEFT,
                'items-center': contentAlignment === Alignment.CENTER,
                'items-end': contentAlignment === Alignment.RIGHT
              }
            )}
          >
            <h2
              className={cn(
                'drop-shadow-xl shadow font-extrabold leading-snug md:leading-tight',
                'xl:leading-[1.3em] mb-3 md:mb-4 xl:mb-3 -mt-2 xl:-mt-3 2xl:-mt-4',
                headerSize === TextSize.LARGE &&
                  'text-2xl md:text-4xl xl:text-5xl',
                headerSize === TextSize.MEDIUM &&
                  'text-xl md:text-3xl xl:text-4xl',
                headerSize === TextSize.SMALL &&
                  'text-lg md:text-2xl xl:text-3xl'
              )}
              style={{
                color: headerColor ?? '#fff'
              }}
            >
              {header}
            </h2>
            <p
              className={cn(
                'text-base md:text-[17px] line-clamp-4 xl:text-lg leading-7 md:leading-8 xl:leading-[1.92em] whitespace-normal',
                'text-skin-inverted',
                {
                  'text-center': contentAlignment === Alignment.CENTER,
                  'text-end': contentAlignment === Alignment.RIGHT
                }
              )}
              style={{
                color: textColor ?? '#fff'
              }}
            >
              {text}
            </p>
            {btnLabel && (
              <Link
                href={btnLink ?? '/'}
                className={cn(
                  'h-[45px] w-fit mt-2 text-sm inline-flex items-center justify-center transition duration-300 uppercase leading-4',
                  'rounded-sm px-6 py-2 font-semibold bg-skin-inverted text-skin-base hover:text-skin-inverted hover:bg-skin-primary'
                )}
                style={{
                  color: btnTextColor ?? '#222',
                  background: btnBgColor ?? '#fff'
                }}
                target="_blank"
              >
                {btnLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageBanner
