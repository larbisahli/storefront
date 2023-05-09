/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ProductTypes } from '@dropgala/types'
import type {
  CartItemType,
  VariationOptionsType
} from '@dropgala/types/product.type'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'

import { siteSettings } from '../../../settings/site-settings'
import { AttributeDisplay, Counter, Image } from '../../common'
import { ImageType } from '@dropgala/types/common.type'

const Link = dynamic(() => import('../../ui/Link'))

type CartItemProps = {
  item: CartItemType
  incrementItem: (item: CartItemType) => void
  decrementItem: (item: CartItemType) => void
  handleCloseCart: () => void
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  incrementItem,
  decrementItem,
  handleCloseCart
}) => {
  const router = useRouter()
  const { locale = '' } = router

  const {
    name,
    thumbnail,
    slug,
    type,
    quantity,
    salePrice,
    comparePrice,
    variations,
    orderVariationOption = {} as VariationOptionsType
  } = item

  console.log({ orderVariationOption })

  const imageThumbnail =
    thumbnail && thumbnail?.length > 0 ? thumbnail[0] : ({} as ImageType)

  const isVariableType = type?.id === ProductTypes.Variable

  const selectedSalePrice = isVariableType
    ? orderVariationOption?.salePrice
    : salePrice

  const selectedComparePrice = isVariableType
    ? orderVariationOption?.comparePrice
    : comparePrice

  const productQuantity = isVariableType
    ? orderVariationOption?.quantity
    : quantity

  const image = orderVariationOption?.image ?? imageThumbnail?.image
  const placeholder = imageThumbnail?.placeholder

  const price = usePrice({
    amount: selectedSalePrice ?? 0,
    locale,
    currencyCode: siteSettings?.currencyCode
  })

  const productPrice = useMemo(() => price?.replace(/(\.0+|0+)$/, ''), [price])

  const discount = usePrice({
    amount: selectedComparePrice ?? 0,
    locale,
    currencyCode: siteSettings?.currencyCode
  })

  const productDiscount = useMemo(
    () => discount?.replace(/(\.0+|0+)$/, ''),
    [discount]
  )

  const total = usePrice({
    amount: (selectedSalePrice ?? 0) * (item.orderQuantity ?? 1),
    locale,
    currencyCode: siteSettings?.currencyCode
  })

  const totalPrice = useMemo(() => total?.replace(/(\.0+|0+)$/, ''), [total])

  return (
    <div
      className="w-full h-auto flex justify-start items-start bg-white py-6 px-30px border-b
                    border-gray-200 relative last:border-b-0"
    >
      <Link
        href={{
          pathname: '/[slug]',
          query: { slug }
        }}
        passHref
      >
        <div
          className="flex w-105px h-105px rounded-sm overflow-hidden bg-gray-200 flex-shrink-0"
          onClick={handleCloseCart}
        >
          <Image
            src={image ?? ''}
            customPlaceholder={placeholder ?? ''}
            width={105}
            height={105}
            quality={100}
            className="object-cover bg-skin-thumbnail rounded-sm"
            alt=""
          />
        </div>
      </Link>

      <div className="flex flex-col w-full px-15px">
        <Link
          href={{
            pathname: '/[slug]',
            query: { slug }
          }}
        >
          <div className="line-clamp-2 !text-[13px] sm:text-sm lg:text-[15px] leading-4 sm:leading-5 mb-1 text-gray-800">
            <div onClick={handleCloseCart}>{name}</div>
          </div>
        </Link>

        <div className="flex items-center text-13px text-gray-700 mt-3px mb-3px">
          <div>
            <span className="inline-block text-base lg:text-[19px] text-skin-base font-medium">
              {productPrice}
            </span>
          </div>

          {selectedComparePrice && (
            <div className="flex items-center">
              <div className="bg-gray-500 h-[17px] w-[1px] mx-1"></div>
              <del className="text-base text-gray-600 text-opacity-80">
                {productDiscount}
              </del>
            </div>
          )}
        </div>

        <div className="flex items-center text-13px text-gray-500 mb-10px flex-wrap">
          {variations?.map((variation) => {
            return (
              <div
                key={variation?.attribute?.id}
                className="pr-2 flex items-center my-1"
              >
                <span className="text-skin-base">
                  {variation?.attribute?.name}:
                </span>
                <AttributeDisplay
                  {...{
                    orderVariationOption,
                    variations,
                    variation
                  }}
                />
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-between">
          <Counter
            value={item.orderQuantity ?? 1}
            onIncrement={() => incrementItem(item)}
            onDecrement={() => decrementItem(item)}
            disabled={(productQuantity ?? 0) - (item.orderQuantity ?? 0) <= 0}
          />
          <span className="font-semibold text-lg text-gray-900 flex-shrink-0">
            {totalPrice}
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(CartItem)
