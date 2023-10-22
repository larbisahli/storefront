import { usePercentDecrease } from '../../hooks/usePercentDecrease'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import type { ProductType } from '@dropgala/types/product.type'
import cn from 'clsx'
import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'
import { HeartEmpty } from '../../assets/icons/heart'
import { ProductCardLayout, ProductTypes } from '@dropgala/types'
import Image from '../common/Image'
import Link from '../ui/Link'
import { StoreProps, selectConfig } from '@dropgala/store'

interface ProductProps extends StoreProps {
  product: ProductType
  layout: ProductCardLayout
  carousel?: boolean
  className?: string
}

const ProductCard: React.FC<ProductProps> = ({
  product,
  layout,
  className,
  carousel = false,
  useAppSelector
}) => {
  // const { t } = useTranslation('common')
  const config = useAppSelector(selectConfig)

  const router = useRouter()
  const { locale = 'en-US' } = router

  const {
    name,
    thumbnail,
    slug,
    salePrice = 0,
    comparePrice = 0,
    type,
    maxPrice = 0,
    minPrice = 0,
    inStock,
    disableOutOfStock
  } = product ?? {}

  const isSoldOut = !disableOutOfStock && !inStock

  const isVariable = type?.id === ProductTypes.Variable

  const price = usePrice({
    amount: salePrice!,
    locale: locale!,
    currencyCode: config?.currency?.code ?? 'USD'
  })

  const maxPrice_ = usePrice({
    amount: maxPrice!,
    locale: locale!,
    currencyCode: config?.currency?.code ?? 'USD'
  })

  const minPrice_ = usePrice({
    amount: minPrice!,
    locale: locale!,
    currencyCode: config?.currency?.code ?? 'USD'
  })

  const discount = usePrice({
    amount: comparePrice!,
    locale: locale!,
    currencyCode: config?.currency?.code ?? 'USD'
  })

  const productMaxPrice = useMemo(
    () => maxPrice_?.replace(/(\.0+|0+)$/, ''),
    [maxPrice_]
  )

  const productMinPrice = useMemo(
    () => minPrice_?.replace(/(\.0+|0+)$/, ''),
    [minPrice_]
  )

  const productDiscount = useMemo(
    () => (comparePrice ? discount?.replace(/(\.0+|0+)$/, '') : null),
    [discount]
  )

  const productPrice = useMemo(
    () => price?.replace(/(\.0+|0+)$/, ''),
    [discount]
  )

  const percentDecrease = usePercentDecrease({ comparePrice, salePrice })

  const { image = '', placeholder = '' } = (thumbnail && thumbnail[0]) ?? {}

  return (
    <Link
      href={{
        pathname: '/product/[slug]',
        query: { slug }
      }}
    >
      <div
        className={cn(
          'flex border-transparent group rounded-sm cursor-pointer hover:shadow-cardHover transition-all duration-300 relative',
          {
            'shadow-cardHover': carousel,
            'flex-row w-full max-h-[400px]': layout === ProductCardLayout.List,
            'flex-col max-w-[400] h-full': layout === ProductCardLayout.Grid
          },
          className
        )}
        title={name}
      >
        <div className="relative flex-shrink-0 overflow-hidden">
          <div
            className={cn(
              'flex overflow-hidden max-w-[400px] transition duration-200 ease-in-out transform group-hover:scale-105 relative',
              {
                'max-w-[200px] lg:max-w-[350px]':
                  layout === ProductCardLayout.List
              }
            )}
          >
            <Image
              src={image}
              customPlaceholder={placeholder}
              width={400}
              height={400}
              quality={100}
              objectFit="cover"
              className={cn('object-cover bg-skin-thumbnail', {
                'rounded-b-none': carousel
              })}
            />
            {isSoldOut && (
              <div className="absolute pt-2.5 md:pt-3.5 z-10 -mx-0.5 sm:-mx-1 inset-0 bg-gray-200 rounded opacity-75 flex items-center justify-center">
                <span className="text-xl font-bold uppercase text-gray-800">
                  {/* {t('text-sold-out')} */}
                </span>
              </div>
            )}
            <button className="absolute top-0 right-0 group-hover:flex hidden items-center justify-center m-3">
              <HeartEmpty width={25} height={25} />
            </button>
          </div>
        </div>

        <div
          className={cn(
            'relative flex flex-col px-3 pb-5 lg:pb-6 lg:pt-4 h-full',
            {
              'flex-1 w-full h-[200px] lg:h-[300px]':
                layout === ProductCardLayout.List
            }
          )}
        >
          <h2
            className={cn(
              'line-clamp-3 h-[40px] lg:line-clamp-2 font-semibold !text-[14px] sm:text-sm lg:text-[15px] leading-5 sm:leading-5 mb-1',
              {
                '!text-lg sm:text-sm lg:text-[15px] !line-clamp-3 h-fit':
                  layout === ProductCardLayout.List
              }
            )}
          >
            {name}
          </h2>
          <div
            className={cn(
              'uppercase h-[15px] w-full text-xs text-gray-900 font-semibold',
              { 'mt-5': layout === ProductCardLayout.List }
            )}
          >
            {!isVariable && percentDecrease && productDiscount && (
              <span>{percentDecrease} off</span>
            )}
          </div>
          <div className="mb-1 lg:mb-1.5 flex items-center">
            {!isVariable && (
              <div
                className={cn('leading-none text-[18px] font-[600]', {
                  'text-red-700 text-opacity-80': productDiscount
                })}
              >
                {productPrice}
              </div>
            )}
            {isVariable && (
              <div
                className={cn('leading-none pt-[5px] text-[18px] font-[600]')}
              >
                {productMinPrice} - {productMaxPrice}
              </div>
            )}
            {!isVariable && productDiscount && (
              <div className="text-[18px] ml-3">
                <del className="text-opacity-80 text-gray-600">
                  {productDiscount}
                </del>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default memo(ProductCard)
