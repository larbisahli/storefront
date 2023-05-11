/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import AddToCartSvg from '../../assets/icons/add-card'
import { usePercentDecrease } from '../../hooks/usePercentDecrease'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import type { ProductType } from '@dropgala/types/product.type'
import cn from 'clsx'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { memo, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { HeartEmpty } from '../../assets/icons/heart'
import { ProductTypes } from '@dropgala/types'

const Image = dynamic(() => import('../common/Image'))
const Link = dynamic(() => import('../ui/Link'))

interface ProductProps {
  product: ProductType
  handleAddToCart: () => void
  carousel?: boolean
}

const ProductCard: React.FC<ProductProps> = ({
  product,
  handleAddToCart,
  carousel = false
}) => {
  const { t } = useTranslation('common')

  const router = useRouter()
  const { locale } = router

  const {
    name,
    thumbnail,
    slug,
    salePrice = 0,
    comparePrice = 0,
    type,
    maxPrice = 0,
    minPrice = 0,
    inStock
  } = product ?? {}

  const isVariable = type?.id === ProductTypes.Variable

  const price = usePrice({
    amount: salePrice!,
    locale: locale!,
    currencyCode: 'USD'
  })

  const maxPrice_ = usePrice({
    amount: maxPrice!,
    locale: locale!,
    currencyCode: 'USD'
  })

  const minPrice_ = usePrice({
    amount: minPrice!,
    locale: locale!,
    currencyCode: 'USD'
  })

  const discount = usePrice({
    amount: comparePrice!,
    locale: locale!,
    currencyCode: 'USD'
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
    () => discount?.replace(/(\.0+|0+)$/, ''),
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
          'flex flex-col border-transparent max-w-[300px] group rounded-sm cursor-pointer hover:shadow-cardHover transition-all duration-300 relative h-full',
          { 'shadow-cardHover': carousel },
          { 'pointer-events-none': !inStock }
        )}
        title={name}
      >
        <div className="relative flex-shrink-0 overflow-hidden">
          <div
            className={cn(
              'flex overflow-hidden max-w-[300px] transition duration-200 ease-in-out transform group-hover:scale-105 relative'
              // { 'm-[5px]': !carousel }
            )}
          >
            <Image
              src={image}
              customPlaceholder={placeholder}
              width={300}
              height={300}
              quality={100}
              objectFit="cover"
              className={cn('object-cover bg-skin-thumbnail', {
                'rounded-b-none': carousel
              })}
            />
            {!inStock && (
              <div className="absolute pt-2.5 md:pt-3.5 z-10 -mx-0.5 sm:-mx-1 inset-0 bg-gray-200 rounded opacity-75 flex items-center justify-center">
                <span className="text-xl font-bold uppercase text-gray-800">
                  {t('text-sold-out')}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="relative flex flex-col px-3 pb-5 lg:pb-6 lg:pt-4 h-full">
          <h2
            className="line-clamp-3 h-[40px] lg:line-clamp-2 font-semibold !text-[14px]
                        sm:text-sm lg:text-[15px] leading-5 sm:leading-5 mb-1"
          >
            {name}
          </h2>
          <div className="uppercase h-[15px] w-full text-xs text-gray-900 font-semibold">
            {!isVariable && percentDecrease && (
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
          <div
            className={cn(
              'absolute shadow-cardHoverNoTop bottom-[-55px] bg-white hidden h-[55px] left-0 right-0 z-10 group-hover:flex w-full'
            )}
          >
            <div
              className={cn(
                'absolute px-3 pb-2 z-10 flex bottom-0 right-0 left-0',
                'w-full h-full  cursor-pointer shadow-badge'
              )}
              onClick={handleAddToCart}
            >
              <div className="flex items-center justify-center bg-black hover:bg-gray-800 w-[80%] h-full">
                <AddToCartSvg width={18} height={18} />
                <span className="uppercase text-white mx-1">Add to cart</span>
              </div>
              <div className="flex items-center justify-center ml-1 w-[20%] h-full">
                <HeartEmpty width={25} height={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default memo(ProductCard)
