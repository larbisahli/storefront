import { ProductTypes, ThunkStatus } from '@dropgala/types'
import type {
  CartItemType,
  VariationOptionsType
} from '@dropgala/types/product.type'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'

import { AttributeDisplay, Counter, Image } from '../common'
import type { ImageType } from '@dropgala/types/common.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import Link from '../ui/Link'
import { StoreProps, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'
import {
  decrementItemThunk,
  incrementItemThunk
} from '@dropgala/store/Cart/thunks'
import Loader from '../ui/loader'
import CloseIcon from '@dropgala/assets/icons/close'

interface CartItemProps extends StoreProps {
  item: CartItemType
  status: ThunkStatus
  incrementItem: (item: CartItemType) => void
  decrementItem: (item: CartItemType) => void
  handleCloseCart: () => void
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  status,
  incrementItem,
  decrementItem,
  handleCloseCart,
  useAppSelector,
  useAppDispatch
}) => {
  const router = useRouter()
  const { language, defaultCurrency, csrf } = useAppSelector(selectConfig)
  const dispatch = useAppDispatch()

  const { __ } = useTranslation(language, 'common')

  const { locale = 'en-US' } = router

  const {
    name,
    thumbnail,
    slug,
    type,
    quantity,
    price,
    variations,
    orderVariationOption = {} as VariationOptionsType
  } = item

  const isConfigurable = type === ProductTypes.Variable

  const selectedSalePrice = isConfigurable
    ? orderVariationOption?.price?.finalPrice?.value
    : price?.finalPrice?.value

  const selectedDiscountPrice = isConfigurable
    ? orderVariationOption?.price?.discount?.amountOff
    : price?.discount?.amountOff

  const selectedDiscountPercent = isConfigurable
    ? orderVariationOption?.price?.discount?.percentOff
    : price?.discount?.percentOff

  const finalPriceExclTaxValue = isConfigurable
    ? orderVariationOption?.price?.finalPriceExclTax?.value
    : price?.finalPriceExclTax?.value

  const productQuantity = isConfigurable
    ? orderVariationOption?.quantity
    : quantity

  const selectedItemThumbnail = isEmpty(orderVariationOption?.thumbnail)
    ? thumbnail
    : orderVariationOption?.thumbnail

  const imageThumbnail = !isEmpty(selectedItemThumbnail)
    ? selectedItemThumbnail![0]
    : ({} as ImageType)

  const itemPrice = usePrice({
    amount: selectedSalePrice ?? 0,
    locale,
    currencyCode: defaultCurrency?.code
  })

  const discountValue = usePrice({
    amount: selectedDiscountPrice ?? 0,
    locale,
    currencyCode: defaultCurrency?.code
  })

  const ExclTaxFinalPrice = usePrice({
    amount: (finalPriceExclTaxValue ?? 0) * (item.orderQuantity ?? 1),
    locale: locale!,
    currencyCode: defaultCurrency?.code
  })

  const total = usePrice({
    amount: (selectedSalePrice ?? 0) * (item.orderQuantity ?? 1),
    locale,
    currencyCode: defaultCurrency?.code
  })

  const { image = '', placeholder = '' } = imageThumbnail

  const handleIncrementItem = () => {
    dispatch(
      incrementItemThunk({
        cartId: '123',
        itemId: 1222,
        storeId: '1233',
        csrfToken: csrf?.csrfToken!
      })
    )
  }

  const handleDecrementItem = () => {
    dispatch(
      decrementItemThunk({
        cartId: '123',
        itemId: 123,
        storeId: '1233',
        csrfToken: csrf?.csrfToken!
      })
    )
  }

  const handleDeleteItem = () => {}

  return (
    <div
      className="w-full h-auto flex justify-start items-start bg-white py-6 p-3 lg:p-70 border-b
                    border-gray-200 relative last:border-b-0"
    >
      {ThunkStatus.PENDING === status && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/10 z-40 flex justify-center items-center">
          <Loader />
        </div>
      )}
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

      <div className="flex flex-col w-full pl-15px">
        <div className="flex justify-between items-center">
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
          <div
            onClick={handleDeleteItem}
            className="px-3 text-black hover:text-red-600 self-start cursor-pointer"
          >
            <CloseIcon width={12} height={18} />
          </div>
        </div>

        <div className="flex items-center text-13px mt-3px mb-3px">
          <div>
            <span className="inline-block text-base lg:text-[19px] text-gray-900 font-semibold">
              {itemPrice}
            </span>
          </div>

          {selectedDiscountPrice && (
            <div className="flex items-center">
              <div className="bg-gray-600 h-[17px] w-[1px] mx-1"></div>
              <del className="text-base text-gray-600 text-opacity-80">
                {discountValue}
              </del>
              {selectedDiscountPercent && (
                <span className="mx-2 self-end pb-[2px] uppercase text-xs text-red-700 font-semibold">
                  {`${Math.round(selectedDiscountPercent)}%`} off
                </span>
              )}
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
                    isConfigurable,
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
            onIncrement={handleIncrementItem}
            onDecrement={handleDecrementItem}
            disabled={(productQuantity ?? 0) - (item.orderQuantity ?? 0) <= 0}
          />
          <div className="flex flex-col items-end">
            <span className="font-semibold text-lg text-gray-900 flex-shrink-0">
              {total}
            </span>
            <span className="text-gray-800 text-xs font-medium">
              {__('Excl. tax: %s', ExclTaxFinalPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(CartItem)
