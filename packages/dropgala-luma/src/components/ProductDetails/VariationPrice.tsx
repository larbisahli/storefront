// import usePrice from '@framework/product/use-price';
import Badge from '../ui/Badge'
import { usePercentDecrease } from '../../hooks/usePercentDecrease'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { useRouter } from 'next/router'
import { memo, useMemo } from 'react'
import { VariationOptionsType } from '@dropgala/types/product.type'
import { StoreProps, selectConfig } from '@dropgala/store'

interface Props extends StoreProps {
  selectedVariationOption?: VariationOptionsType
  salePrice: number
  comparePrice: number
  isConfigurable: boolean
}

function VariationPrice({
  selectedVariationOption,
  salePrice,
  comparePrice,
  isConfigurable,
  useAppSelector
}: Props) {
  const router = useRouter()
  const { locale = 'en-US' } = router

  const config = useAppSelector(selectConfig)

  const selectedSalePrice = isConfigurable
    ? selectedVariationOption?.salePrice
    : salePrice
  const selectedComparePrice = isConfigurable
    ? selectedVariationOption?.comparePrice
    : comparePrice

  const percentDecrease = usePercentDecrease({
    comparePrice: selectedComparePrice ?? 0,
    salePrice: selectedSalePrice ?? 0
  })

  const price = usePrice({
    amount: selectedSalePrice ?? 0,
    locale: locale!,
    currencyCode: config?.defaultCurrency?.code
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
    locale: locale!,
    currencyCode: config?.defaultCurrency?.code
  })

  const productDiscount = useMemo(
    () => discount?.replace(/(\.0+|0+)$/, ''),
    [discount]
  )

  return (
    <div className="flex-1">
      <div className="flex items-center">
        <div className="text-skin-base font-bold text-xl lg:text-2xl leading-none">
          {!!selectedSalePrice && productPrice}
        </div>
        {!!selectedComparePrice && (
          <>
            <del className="pl-3 text-gray-900 text-xs xl:text-base text-opacity-50 leading-none">
              {productDiscount}
            </del>
            <Badge textColor="text-red-700 font-semibold">
              {percentDecrease} {'off'}
            </Badge>
          </>
        )}
      </div>
      <span className="text-xs text-gray-900">Excl. tax: $500.00</span>
    </div>
  )
}

export default memo(VariationPrice)
