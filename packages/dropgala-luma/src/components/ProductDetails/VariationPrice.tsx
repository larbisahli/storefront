// import usePrice from '@framework/product/use-price';
import Badge from '../ui/Badge'
import { usePercentDecrease } from '../../hooks/usePercentDecrease'
import { usePrice } from '@dropgala/utils/hooks/usePrice'
import { useRouter } from 'next/router'
import { memo, useMemo } from 'react'
import { VariationOptionsType } from '@dropgala/types/product.type'

interface Props {
  selectedVariationOption?: VariationOptionsType
  salePrice: number
  comparePrice: number
  isVariableType: boolean
}

function VariationPrice({
  selectedVariationOption,
  salePrice,
  comparePrice,
  isVariableType
}: Props) {
  const router = useRouter()
  const { locale } = router

  const selectedSalePrice = isVariableType
    ? selectedVariationOption?.salePrice
    : salePrice
  const selectedComparePrice = isVariableType
    ? selectedVariationOption?.comparePrice
    : comparePrice

  const percentDecrease = usePercentDecrease({
    comparePrice: selectedComparePrice,
    salePrice: selectedSalePrice
  })

  const price = usePrice({
    amount: selectedSalePrice ?? 0,
    locale: locale!,
    currencyCode: 'USD'
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
    amount: selectedComparePrice,
    locale: locale!,
    currencyCode: 'USD'
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
          <del className="text-sm md:text-15px pl-3 text-skin-base text-opacity-50">
            {productDiscount}
          </del>
          <Badge
            backgroundColor="bg-red-300"
            border="border border-sink-base"
            textColor="text-skin-red"
          >
            {percentDecrease} {/* {t('text-off')} */}
          </Badge>
        </>
      )}
    </div>
  )
}

export default memo(VariationPrice)
