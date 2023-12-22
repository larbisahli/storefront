import AttributeDisplay from '../common/AttributeDisplay'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import cn from 'clsx'
import { useRouter } from 'next/router'
import React, { FC, memo, useMemo, useState } from 'react'
import Counter from '../common/Counter'
import { ProductTypes } from '@dropgala/types'
import {
  StoreProps,
  decrementItem,
  incrementItem,
  removeItem,
  selectConfig
} from '@dropgala/store'
import { CartItemType } from '@dropgala/types/product.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import CheckoutItemModal from './CheckoutItemModal'
import Image from '../common/Image'
import Link from '../ui/Link'
import useTranslation from '@dropgala/utils/hooks/useTranslation'

interface Props extends StoreProps {
  item: CartItemType
  disabled?: boolean
}

const CheckoutCartItem: FC<Props> = ({
  item,
  disabled = false,
  useAppDispatch,
  useAppSelector
}) => {
  const router = useRouter()
  const { locale = 'en-US' } = router

  const dispatch = useAppDispatch!()

  const { defaultCurrency, language } = useAppSelector(selectConfig)

  const { __ } = useTranslation(language, 'common')

  let [isOpen, setIsOpen] = useState(false)

  const {
    name,
    thumbnail,
    slug,
    type,
    quantity,
    price,
    variations,
    orderVariationOption
  } = item

  const isConfigurable = type === ProductTypes.Variable

  const selectedSalePrice =
    (isConfigurable
      ? orderVariationOption?.price?.finalPrice.value
      : price?.finalPrice.value) ?? 0

  const selectedComparePrice =
    (isConfigurable
      ? orderVariationOption?.price?.discount?.amountOff
      : price?.discount?.amountOff) ?? 0

  const productQuantity =
    (isConfigurable ? orderVariationOption?.quantity : quantity) ?? 0

  const finalPriceExclTaxValue = isConfigurable
    ? orderVariationOption?.price?.finalPriceExclTax?.value
    : price?.finalPriceExclTax?.value

  const selectedDiscountPercent = isConfigurable
    ? orderVariationOption?.price?.discount?.percentOff
    : price?.discount?.percentOff

  const { image, placeholder } = !isEmpty(orderVariationOption?.thumbnail)
    ? orderVariationOption?.thumbnail[0] ?? { image: '', placeholder: '' }
    : !isEmpty(thumbnail)
    ? thumbnail![0]
    : { image: '', placeholder: '' }

  const ItemPrice = usePrice({
    amount: selectedSalePrice,
    locale: locale!,
    currencyCode: defaultCurrency?.code
  })

  const discount = usePrice({
    amount: selectedComparePrice,
    locale: locale!,
    currencyCode: defaultCurrency?.code
  })

  const total = usePrice({
    amount: selectedSalePrice * item?.orderQuantity!,
    locale: locale!,
    currencyCode: defaultCurrency?.code
  })

  const ExclTaxFinalPrice = usePrice({
    amount: finalPriceExclTaxValue ?? 0,
    locale: locale!,
    currencyCode: defaultCurrency?.code
  })

  const handleOpenAttribute = () => {
    setIsOpen(true)
  }

  return (
    <div className="w-full h-auto flex justify-start items-start bg-white py-6 px-30px border-b border-gray-200 relative last:border-b-0">
      <CheckoutItemModal
        {...{ item, isOpen, setIsOpen, useAppDispatch, useAppSelector }}
      />
      <Link
        href={{
          pathname: '/product/[slug]',
          query: { slug }
        }}
        passHref
      >
        <div className="event flex w-110px h-165px rounded-sm overflow-hidden bg-gray-100 flex-shrink-0">
          <div className="relative">
            <Image
              src={image}
              customPlaceholder={placeholder}
              width={110}
              height={165}
              className="object-contain bg-skin-thumbnail rounded-sm"
            />
            <div
              className="absolute right-0 bottom-0 left-0 bg-skin-black-rgba-6
               text-white text-xs text-center py-[3px] font-bold"
            >
              {disabled && <span>Sold Out</span>}
              {!disabled && <span>Almost sold out</span>}
              {/* <span>Only 2 Left bg-skin-red-rgba-6</span> */}
            </div>
          </div>
        </div>
      </Link>

      <div className="flex justify-between w-full px-15px">
        <div className="flex flex-col flex-1">
          <Link
            href={{
              pathname: '/product/[slug]',
              query: { slug }
            }}
          >
            <div
              className={cn(
                'line-clamp-2 !text-[15px] hover:font-semibold sm:text-sm lg:text-[15px] leading-4 sm:leading-5 mb-1 text-gray-800',
                {
                  'opacity-50 pointer-events-none': disabled
                }
              )}
            >
              <div>{name}</div>
            </div>
          </Link>

          <div
            className={cn(
              'flex items-center text-13px text-gray-900 mt-3px mb-3px',
              {
                'opacity-50': disabled
              }
            )}
          >
            <div className="flex flex-col">
              <div className="flex items-center">
                {!!ItemPrice && (
                  <span className="inline-block text-[18px] lg:text-[19px] font-semibold">
                    {ItemPrice}
                  </span>
                )}
                {!!selectedComparePrice && (
                  <div className="flex items-center">
                    <div className="bg-gray-400 h-[10px] w-[1px] mx-1"></div>
                    <del className="text-[13px] text-gray-600 text-opacity-80">
                      {discount}
                    </del>
                    {selectedDiscountPercent && (
                      <span className="mx-2 self-end pb-[2px] uppercase text-xs text-red-700 font-semibold">
                        {`${Math.round(selectedDiscountPercent)}%`} off
                      </span>
                    )}
                  </div>
                )}
              </div>
              <span className="text-gray-800 text-xs font-medium">
                {__('Excl. tax: %s', ExclTaxFinalPrice)}
              </span>
            </div>
          </div>
          {disabled && (
            <div className="mt-3 text-skin-red text-xs">Reselect</div>
          )}
          <div className="flex items-center text-13px text-gray-500 mb-10px flex-wrap">
            {variations?.map((variation) => {
              return (
                <div
                  key={variation?.attribute?.id}
                  className="pr-2 flex items-center my-1"
                >
                  <span className="text-gray-800">
                    {variation?.attribute?.name}:
                  </span>
                  <AttributeDisplay
                    isConfigurable={isConfigurable}
                    orderVariationOption={orderVariationOption}
                    variations={variations}
                    variation={variation}
                    onClick={handleOpenAttribute}
                  />
                </div>
              )
            })}
          </div>
          <div
            className={cn('flex items-center justify-between', {
              'opacity-50 pointer-events-none': disabled
            })}
          >
            <Counter
              value={item.orderQuantity!}
              onIncrement={() => {
                dispatch(incrementItem(item))
              }}
              onDecrement={() => {
                dispatch(decrementItem(item))
              }}
              disabled={productQuantity - item.orderQuantity! <= 0}
            />
          </div>
          {disabled && (
            <button
              onClick={() => {
                dispatch(removeItem(item))
              }}
              className="mt-3 bg-gray-300 py-1 px-4 rounded-full text-black hover:font-semibold text-xs cursor-pointer pointer-events-auto opacity-none w-fit"
            >
              Delete
            </button>
          )}
        </div>
        <div
          className={cn('flex items-center', {
            'opacity-50': disabled
          })}
        >
          <span className="font-semibold text-16px text-gray-900 flex-shrink-0">
            {total}
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(CheckoutCartItem)
