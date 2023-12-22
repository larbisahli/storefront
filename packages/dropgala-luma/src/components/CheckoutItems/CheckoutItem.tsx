import { AttributeTypeTypes, ProductTypes } from '@dropgala/types'
import CouponIcon from '@dropgala/assets/icons/coupon-icon'
import ImageComponent from '../common/Image'
import {
  ProductType,
  VariationOptionsType,
  VariationsType
} from '@dropgala/types/product.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { useRouter } from 'next/router'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { StoreProps, selectConfig } from '@dropgala/store'
import cn from 'clsx'
import useTranslation from '@dropgala/utils/hooks/useTranslation'

type CheckoutItemProps = {
  item: ProductType
  useAppSelector: StoreProps['useAppSelector']
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({
  useAppSelector,
  item
}) => {
  const router = useRouter()
  const { locale = 'en-US' } = router

  const { defaultCurrency, language } = useAppSelector(selectConfig)

  const { __ } = useTranslation(language, 'common')

  const {
    name,
    type,
    thumbnail,
    price,
    variations,
    variationOptions,
    orderVariationOption,
    orderQuantity = 0
  } = item

  const [selectedVariations, setSelectedVariations] = useState<
    VariationsType[]
  >([])

  const isConfigurable = type === ProductTypes.Variable

  // const selectedVariationOption = useMemo(() => {
  //   const selectedAttributesOption = selectedVariations?.map(
  //     (selectedVariation) => {
  //       return selectedVariation?.value?.id;
  //     }
  //   );

  //   return variationOptions?.find((vop) => {
  //     return isEqual(sortBy(vop?.options), sortBy(selectedAttributesOption));
  //   });
  // }, [selectedVariations, variationOptions]);

  const selectedSalePrice =
    (isConfigurable
      ? orderVariationOption?.price?.finalPrice?.value
      : price?.finalPrice.value) ?? 0

  const selectedDiscountPrice = isConfigurable
    ? orderVariationOption?.price?.discount?.amountOff
    : price?.discount?.amountOff

  const selectedDiscountPercent = isConfigurable
    ? orderVariationOption?.price?.discount?.percentOff
    : price?.discount?.percentOff

  const finalPriceExclTaxValue = isConfigurable
    ? orderVariationOption?.price?.finalPriceExclTax?.value
    : price?.finalPriceExclTax?.value

  const discountValue = usePrice({
    amount: selectedDiscountPrice ?? 0,
    locale,
    currencyCode: defaultCurrency?.code
  })

  const total = usePrice({
    amount: selectedSalePrice * orderQuantity,
    locale,
    currencyCode: defaultCurrency?.code
  })

  const ExclTaxFinalPrice = usePrice({
    amount: (finalPriceExclTaxValue ?? 0) * (item.orderQuantity ?? 1),
    locale: locale!,
    currencyCode: defaultCurrency?.code
  })
  useEffect(() => {
    console.log('---------------------Y------------------------ :>> ')
    try {
      let selectedVariationOptions = {} as VariationOptionsType | undefined

      if (isEmpty(variationOptions)) return

      if (isEmpty(orderVariationOption)) {
        // get variation_options minimum sale_price
        selectedVariationOptions = variationOptions?.reduce((acc, loc) =>
          acc?.price?.finalPrice?.value < loc?.price?.finalPrice?.value
            ? acc
            : loc
        )
      } else {
        selectedVariationOptions = orderVariationOption
      }

      if (isEmpty(selectedVariationOptions)) return

      // map default
      const results = variations?.map((v) => {
        const options = selectedVariationOptions?.options
        return {
          attribute: v?.attribute,
          value: (v?.values?.filter((v) => options?.includes(v?.id!)) ?? [])[0]
        }
      })

      results && setSelectedVariations(results)
    } catch (error) {
      // sentry({
      //   message: 'ProductAttributes variation_options defaults',
      //   error
      // });
    }
  }, [
    orderVariationOption,
    setSelectedVariations,
    variationOptions,
    variations
  ])

  const { image, placeholder } = !isEmpty(orderVariationOption?.thumbnail)
    ? orderVariationOption?.thumbnail[0] ?? { image: '', placeholder: '' }
    : !isEmpty(thumbnail)
    ? thumbnail![0]
    : { image: '', placeholder: '' }

  return (
    <div className="w-full h-auto flex justify-start items-start mt-5 relative last:border-b-0">
      <div className="relative flex w-75px h-75px rounded flex-shrink-0">
        <div
          className="absolute text-xs bg-black rounded-full z-10
          text-white h-5 w-5 flex items-center font-semibold justify-center right-[-5px] top-[-5px] shadow-card"
        >
          <span>{orderQuantity}</span>
        </div>
        <div>
          <ImageComponent
            src={image}
            customPlaceholder={placeholder}
            width={75}
            height={75}
            quality={90}
            className="object-cover bg-skin-thumbnail rounded"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center pl-15px">
        <div className="flex flex-col w-full">
          <div className="flex items-start flex-col">
            <div
              title={name}
              className="flex-1 line-clamp-1 !text-[13px] sm:text-sm lg:text-[15px] leading-4 sm:leading-5 text-gray-900 font-medium"
            >
              {name}
            </div>
            {/* ---- price area ---- */}
            <div className="flex items-end justify-end flex-shrink-0">
              <span className="inline-block text-[16px] text-gray-900 font-semibold">
                {total}
              </span>
              {selectedDiscountPrice && (
                <div className="flex items-center">
                  <div className="bg-gray-600 h-[17px] w-[1px] mx-1"></div>
                  <del className="text-base text-gray-700 text-opacity-80">
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
            <span className="text-gray-800 text-xs font-medium">
              {__('Excl. tax: %s', ExclTaxFinalPrice)}
            </span>
          </div>
        </div>
        <div className="flex items-center text-13px text-gray-500 mb-5px">
          {/* ------ */}
          <div className="flex-1 pr-2 text-gray-500">
            <div className="flex items-center text-13px mb-4px flex-wrap">
              {variations?.map((variation, idx) => {
                return (
                  <div
                    key={variation?.attribute?.id}
                    className="flex items-center"
                  >
                    <OrderVariations
                      isConfigurable={isConfigurable}
                      variation={variation}
                      selectedVariations={selectedVariations}
                    />
                    {variations?.length != idx + 1 && (
                      <span className="h-3 bg-gray-500 w-[1px] mx-1"></span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface OrderVariationsProps {
  isConfigurable: boolean
  variation: VariationsType
  selectedVariations: VariationsType[]
}

const OrderVariations = ({
  isConfigurable,
  variation,
  selectedVariations
}: OrderVariationsProps) => {
  const { attribute, values } = variation
  const selectedVariation = useMemo(
    () => selectedVariations?.find((sv) => sv?.attribute?.id === attribute?.id),
    [selectedVariations, attribute]
  )
  const value = selectedVariation?.value?.value
  const name = selectedVariation?.value?.name
  const isColor =
    selectedVariation?.attribute?.type === AttributeTypeTypes.COLOR
  const simpleProductIsColor = attribute?.type === AttributeTypeTypes.COLOR
  const simpleProductValue = values ? values[0]?.value : ''
  const simpleProductName = values ? values[0]?.name : ''

  if (!value && !simpleProductValue) return null

  if (isConfigurable) {
    return (
      <div
        className={cn(
          'rounded border shadow-badge flex justify-center items-center font-medium',
          'text-sm text-gray-700 transition duration-200 ease-in-out py-1',
          {
            '!rounded-full': isColor,
            '!w-5': isColor,
            '!h-5': isColor
          }
        )}
        style={{
          background: isColor ? value : ''
        }}
        title={name}
      >
        <span>{isColor ? '' : value}</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded border shadow-badge flex justify-center items-center font-medium',
        'text-sm text-gray-700 transition duration-200 ease-in-out py-1',
        {
          '!rounded-full': simpleProductIsColor,
          '!w-5': simpleProductIsColor,
          '!h-5': simpleProductIsColor
        }
      )}
      style={{
        background: simpleProductIsColor ? simpleProductValue : ''
      }}
      title={simpleProductName}
    >
      <span>{simpleProductIsColor ? '' : simpleProductValue}</span>
    </div>
  )
}

export default memo(CheckoutItem)
