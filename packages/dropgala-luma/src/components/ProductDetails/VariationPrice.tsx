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
  isVariableType: boolean
}

function VariationPrice({
  selectedVariationOption,
  salePrice,
  comparePrice,
  isVariableType,
  useAppSelector
}: Props) {
  const router = useRouter()
  const { locale } = router

  const config = useAppSelector(selectConfig)

  const selectedSalePrice = isVariableType
    ? selectedVariationOption?.salePrice
    : salePrice
  const selectedComparePrice = isVariableType
    ? selectedVariationOption?.comparePrice
    : comparePrice

  const percentDecrease = usePercentDecrease({
    comparePrice: selectedComparePrice ?? 0,
    salePrice: selectedSalePrice ?? 0
  })

  const price = usePrice({
    amount: selectedSalePrice ?? 0,
    locale: locale!,
    currencyCode: config?.currency?.code ?? 'USD'
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
    currencyCode: config?.currency?.code ?? 'USD'
  })

  const productDiscount = useMemo(
    () => discount?.replace(/(\.0+|0+)$/, ''),
    [discount]
  )

  return (
    <div className="flex items-center mt-5">
      <div className="text-skin-base font-bold text-base md:text-xl xl:text-[22px]">
        {!!selectedSalePrice && productPrice}
      </div>
      {selectedComparePrice && (
        <>
          <del className="pl-3 text-gray-900 text-base text-opacity-50">
            {productDiscount}
          </del>
          <Badge
            backgroundColor="bg-red-300"
            border="border border-red-200"
            textColor="text-red-700"
          >
            {percentDecrease} {'OFF'}
          </Badge>
        </>
      )}
    </div>
  )
}

export default memo(VariationPrice)
