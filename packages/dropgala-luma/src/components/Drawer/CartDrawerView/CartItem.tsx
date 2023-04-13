/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ProductTypes } from '@dropgala/types'
import type {
  ProductType,
  VariationOptionsType
} from '@dropgala/types/product.type'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import dynamic from 'next/dynamic'
// import { decrementItem, incrementItem } from '@store/card/index'
// import { slideCart } from '@store/drawer/index'
import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'

import { siteSettings } from '../../../settings/site-settings'
import { AttributeDisplay, Counter, Image } from '../../common'

const Link = dynamic(() => import('../../ui/Link'))

type CartItemProps = {
  item: ProductType
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
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
  const image = orderVariationOption?.image ?? thumbnail?.image
  const placeholder = thumbnail?.placeholder

  const price = usePrice({
    amount: selectedSalePrice ?? 0,
    locale,
    currencyCode: siteSettings?.currencyCode
  })

  const productPrice = useMemo(
    () =>
      price
        ?.replace(/(\.0+|0+)$/, '')
        ?.split(/([0-9]+)/)
        ?.filter((v) => v),
    [price]
  )

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

  const hideCart = () => {
    // dispatch(slideCart(false))
  }

  return (
    <div
      className="w-full h-auto flex justify-start items-start bg-white py-6 px-30px border-b
                    border-gray-200 relative last:border-b-0"
    >
      <Link
        href={{
          pathname: '/product/[slug]',
          query: { slug }
        }}
        passHref
      >
        <a className="flex w-105px h-105px rounded overflow-hidden bg-gray-200 flex-shrink-0">
          <div onClick={hideCart}>
            <Image
              src={image ?? ''}
              customPlaceholder={placeholder ?? ''}
              width={105}
              height={105}
              quality={100}
              className="object-cover bg-skin-thumbnail rounded"
              alt=""
            />
          </div>
        </a>
      </Link>

      <div className="flex flex-col w-full px-15px">
        <Link
          href={{
            pathname: '/product/[slug]',
            query: { slug }
          }}
        >
          <a className="line-clamp-2 !text-[13px] sm:text-sm lg:text-[15px] leading-4 sm:leading-5 mb-1 text-gray-800">
            <div onClick={hideCart}>{name}</div>
          </a>
        </Link>

        <div className="flex items-center text-13px text-gray-500 mt-3px mb-3px">
          <div>
            {productPrice?.map((v, idx) => {
              if (v !== '$' && productPrice?.length !== idx + 1) {
                return (
                  <span
                    key={idx}
                    className="inline-block text-[18px] lg:text-[19px] text-skin-base font-medium"
                  >
                    {v}
                  </span>
                )
              }
              return (
                <span
                  key={idx}
                  className="inline-block text-[14px] lg:text-[15px] text-skin-base font-normal"
                >
                  {v}
                </span>
              )
            })}
          </div>

          {selectedComparePrice && (
            <div className="flex items-center">
              <div className="bg-gray-400 h-[10px] w-[1px] mx-1"></div>
              <del
                style={{ color: '#a5a5a5' }}
                className="text-[13px] text-skin-base text-opacity-80"
              >
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
            onIncrement={() => {
              // dispatch(incrementItem(item))
            }}
            onDecrement={() => {
              // dispatch(decrementItem(item))
            }}
            disabled={(productQuantity ?? 0) - (item.orderQuantity ?? 0) <= 0}
          />
          <span className="font-semibold text-16px text-gray-900 flex-shrink-0">
            {totalPrice}
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(CartItem)
