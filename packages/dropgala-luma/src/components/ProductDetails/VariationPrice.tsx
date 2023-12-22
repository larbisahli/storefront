// import usePrice from '@framework/product/use-price';
import Badge from '../ui/Badge'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { useRouter } from 'next/router'
import { memo } from 'react'
import { PriceType, VariationOptionsType } from '@dropgala/types/product.type'
import { StoreProps, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'

interface Props extends StoreProps {
  selectedVariationOption?: VariationOptionsType
  price?: PriceType
  isConfigurable: boolean
}

function VariationPrice({
  selectedVariationOption,
  price,
  isConfigurable,
  useAppSelector
}: Props) {
  const router = useRouter()
  const { locale = 'en-US' } = router

  const config = useAppSelector(selectConfig)

  const { __ } = useTranslation(config.language, 'common')

  const selectedFinalPrice = isConfigurable
    ? selectedVariationOption?.price?.finalPrice?.value
    : price?.finalPrice?.value

  const selectedDiscountAmountOff = isConfigurable
    ? selectedVariationOption?.price?.discount?.amountOff
    : price?.discount?.amountOff

  const selectedFinalPriceExclTax = isConfigurable
    ? selectedVariationOption?.price?.finalPriceExclTax?.value
    : price?.finalPriceExclTax.value

  const selectedDiscountPercentOff = isConfigurable
    ? selectedVariationOption?.price?.discount?.percentOff
    : price?.discount?.percentOff

  const productPriceValue = usePrice({
    amount: selectedFinalPrice ?? 0,
    locale: locale!,
    currencyCode: config?.defaultCurrency?.code
  })

  const discount = usePrice({
    amount: selectedDiscountAmountOff ?? 0,
    locale: locale!,
    currencyCode: config?.defaultCurrency?.code
  })

  const finalPriceExclTax = usePrice({
    amount: selectedFinalPriceExclTax ?? 0,
    locale: locale!,
    currencyCode: config?.defaultCurrency?.code
  })

  return (
    <div className="flex-1">
      <div className="flex items-center">
        <div className="text-skin-base font-bold text-xl lg:text-2xl leading-none">
          {!!selectedFinalPrice && productPriceValue}
        </div>
        {!!selectedDiscountAmountOff && (
          <>
            <del className="pl-3 text-gray-900 text-base text-opacity-70 leading-none">
              {discount}
            </del>
            <Badge textColor="text-red-700 font-semibold">
              {`${Math.round(selectedDiscountPercentOff ?? 0)}%`} {'off'}
            </Badge>
          </>
        )}
      </div>
      <span className="text-[14px] font-medium">
        {__('Excl. tax: %s', finalPriceExclTax)}
      </span>
    </div>
  )
}

export default memo(VariationPrice)
