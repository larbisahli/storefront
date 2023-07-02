/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ProductTypes } from '@dropgala/types'
import CouponIcon from '../../assets/icons/coupon-icon'
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

type CheckoutItemProps = {
  item: ProductType
  useAppSelector: StoreProps['useAppSelector']
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({
  useAppSelector,
  item
}) => {
  const router = useRouter()
  const { locale } = router

  const config = useAppSelector(selectConfig)

  const {
    name,
    type,
    thumbnail,
    salePrice,
    comparePrice,
    variations,
    variationOptions,
    orderVariationOption,
    orderQuantity = 0
  } = item

  const [selectedVariations, setSelectedVariations] = useState<
    VariationsType[]
  >([])

  const isVariableType = type?.id === ProductTypes.Variable

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
    (isVariableType ? orderVariationOption?.salePrice : salePrice) ?? 0

  const selectedComparePrice =
    (isVariableType ? orderVariationOption?.comparePrice : comparePrice) ?? 0

  const discount = usePrice({
    amount: selectedComparePrice,
    locale: locale!,
    currencyCode: config?.currency?.code ?? 'USD'
  })

  const productDiscount = useMemo(
    () => discount?.replace(/(\.0+|0+)$/, ''),
    [discount]
  )

  const total = usePrice({
    amount: selectedSalePrice * orderQuantity,
    locale: locale!,
    currencyCode: 'USD'
  })

  const totalPrice = useMemo(() => total?.replace(/(\.0+|0+)$/, ''), [total])

  useEffect(() => {
    console.log('---------------------Y------------------------ :>> ')
    try {
      let selectedVariationOptions = {} as VariationOptionsType

      if (isEmpty(variationOptions)) return

      if (isEmpty(orderVariationOption)) {
        // get variation_options minimum sale_price
        selectedVariationOptions = variationOptions?.reduce((acc, loc) =>
          acc?.salePrice < loc?.salePrice ? acc : loc
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
          value: (v?.values?.filter((v) => options.includes(v?.id)) ?? [])[0]
        }
      })

      setSelectedVariations(results)
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
    ? orderVariationOption?.thumbnail[0]
    : !isEmpty(thumbnail)
    ? thumbnail![0]
    : { image: '', placeholder: '' }

  return (
    <div className="w-full h-auto flex justify-start items-start mt-5 relative last:border-b-0">
      <div className="relative flex w-75px h-75px rounded flex-shrink-0">
        <div
          className="absolute text-xs bg-gray-600 rounded-full z-10
          text-white h-5 w-5 flex items-center justify-center right-[-5px] top-[-5px] shadow-card "
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

      <div className="flex flex-col w-full px-15px">
        <div className="line-clamp-2 !text-[13px] sm:text-sm lg:text-[15px] leading-4 sm:leading-5 mb-1 text-gray-800">
          {name}
        </div>
        <div className="flex text-13px text-gray-500 mb-5px">
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
            {/* COUPON */}
            <div
              style={{ color: '#686868' }}
              className="flex items-center max-w-[185px]"
            >
              <div>
                <CouponIcon width="1.2rem" height="1.2rem" />
              </div>
              <div className="p-1 overflow-hidden">{'VT_XYRXQIZQ'}</div>
              <div className="">{'(-$12.89)'}</div>
            </div>
          </div>
          {/* ---- price area ---- */}
          <div className="flex flex-col items-end justify-end flex-shrink-0">
            {selectedComparePrice && (
              <del
                style={{ color: '#878787' }}
                className="text-[13px] text-skin-base text-opacity-80"
              >
                {productDiscount}
              </del>
            )}
            <span className="inline-block text-[16px] text-skin-base font-medium">
              {totalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const OrderVariations = ({ variation, selectedVariations }) => {
  const { attribute } = variation

  const selectedVariation = useMemo(
    () => selectedVariations?.find((sv) => sv?.attribute?.id === attribute?.id),
    [selectedVariations, attribute]
  )

  const value = selectedVariation?.value?.value

  if (!value) return
  return <span className="text-skin-muted">{value}</span>
}

export default memo(CheckoutItem)
