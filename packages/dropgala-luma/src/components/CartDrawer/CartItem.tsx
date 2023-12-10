import { ProductTypes } from '@dropgala/types'
import type {
  CartItemType,
  VariationOptionsType
} from '@dropgala/types/product.type'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'

import { siteSettings } from '../../settings/site-settings'
import { AttributeDisplay, Counter, Image } from '../common'
import type { ImageType } from '@dropgala/types/common.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import Link from '../ui/Link'
import { StoreProps, selectConfig } from '@dropgala/store'

interface CartItemProps extends StoreProps {
  item: CartItemType
  incrementItem: (item: CartItemType) => void
  decrementItem: (item: CartItemType) => void
  handleCloseCart: () => void
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  incrementItem,
  decrementItem,
  handleCloseCart,
  useAppSelector
}) => {
  const router = useRouter()
  const config = useAppSelector(selectConfig)

  const { locale = 'en-US' } = router

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

  const isVariableType = type === ProductTypes.Variable

  const selectedSalePrice = isVariableType
    ? orderVariationOption?.salePrice
    : salePrice

  const selectedComparePrice = isVariableType
    ? orderVariationOption?.comparePrice
    : comparePrice

  const productQuantity = isVariableType
    ? orderVariationOption?.quantity
    : quantity

  const selectedItemThumbnail = isEmpty(orderVariationOption?.thumbnail)
    ? thumbnail
    : orderVariationOption?.thumbnail

  const imageThumbnail = !isEmpty(selectedItemThumbnail)
    ? selectedItemThumbnail![0]
    : ({} as ImageType)

  const price = usePrice({
    amount: selectedSalePrice ?? 0,
    locale,
    currencyCode: config?.defaultCurrency?.code
  })

  const productPrice = useMemo(() => price?.replace(/(\.0+|0+)$/, ''), [price])

  const discount = usePrice({
    amount: selectedComparePrice ?? 0,
    locale,
    currencyCode: config?.defaultCurrency?.code
  })

  const productDiscount = useMemo(
    () => discount?.replace(/(\.0+|0+)$/, ''),
    [discount]
  )

  const total = usePrice({
    amount: (selectedSalePrice ?? 0) * (item.orderQuantity ?? 1),
    locale,
    currencyCode: config?.defaultCurrency?.code
  })

  const totalPrice = useMemo(() => total?.replace(/(\.0+|0+)$/, ''), [total])

  const { image = '', placeholder = '' } = imageThumbnail

  return (
    <div
      className="w-full h-auto flex justify-start items-start bg-white py-6 p-3 lg:p-70 border-b
                    border-gray-200 relative last:border-b-0"
    >
      <Link
        href={{
          pathname: '/product/[slug]',
          query: { slug: item?.productSeo?.slug ?? '' }
        }}
      >
        <div
          className="flex w-105px h-105px rounded-sm overflow-hidden bg-gray-200 flex-shrink-0"
          onClick={handleCloseCart}
        >
          <Image
            src={image}
            customPlaceholder={placeholder}
            width={105}
            height={105}
            className="object-cover bg-skin-thumbnail rounded-sm"
            alt=""
          />
        </div>
      </Link>

      <div className="flex flex-col w-full px-15px">
        <Link
          href={{
            pathname: '/product/[slug]',
            query: { slug }
          }}
        >
          <div className="line-clamp-2 text-sm lg:text-base leading-4 sm:leading-5 mb-1 text-gray-800">
            <div onClick={handleCloseCart}>{name}</div>
          </div>
        </Link>

        <div className="flex items-center text-13px mt-3px mb-3px">
          <div>
            <span className="inline-block text-base lg:text-[19px] text-gray-900 font-semibold">
              {productPrice}
            </span>
          </div>

          {selectedComparePrice && (
            <div className="flex items-center">
              <div className="bg-gray-600 h-[17px] w-[1px] mx-1"></div>
              <del className="text-base text-gray-600 text-opacity-80">
                {productDiscount}
              </del>
            </div>
          )}
        </div>

        <div className="flex items-center text-13px text-gray-700 mb-10px flex-wrap">
          {variations?.map((variation) => {
            return (
              <div
                key={variation?.attribute?.id}
                className="pr-2 flex items-center my-1"
              >
                <span className="text-gray-700">
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
