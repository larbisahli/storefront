import { ProductTypes } from '@dropgala/types'
import { ProductType } from '@dropgala/types/product.type'
import { useMemo } from 'react'
import { calcPercentage, calcTaxRate } from 'utils'

export const calcPriceRange = (product: ProductType, rate: number) => {
  const isConfigurable = product?.type === ProductTypes.Variable

  if (isConfigurable) {
    return {
      maximumPrice: {
        finalPrice: {
          value: calcTaxRate(product?.maxSalePrice, rate)
        },
        finalPriceExclTax: {
          value: product?.maxSalePrice
        },
        discount: {
          amountOff: calcTaxRate(product?.maxComparePrice, rate),
          percentOff: calcPercentage(
            calcTaxRate(product?.maxSalePrice, rate),
            calcTaxRate(product?.maxComparePrice, rate)
          )
        }
      },
      minimumPrice: {
        finalPrice: {
          value: calcTaxRate(product?.minSalePrice, rate)
        },
        finalPriceExclTax: {
          value: product?.minSalePrice
        },
        discount: {
          amountOff: calcTaxRate(product?.minComparePrice, rate),
          percentOff: calcPercentage(
            calcTaxRate(product?.minSalePrice, rate),
            calcTaxRate(product?.minComparePrice, rate)
          )
        }
      }
    }
  }
  return {
    maximumPrice: {
      finalPrice: {
        value: calcTaxRate(product?.salePrice, rate)
      },
      finalPriceExclTax: {
        value: product?.salePrice
      },
      discount: {
        amountOff: calcTaxRate(product?.comparePrice, rate),
        percentOff: calcPercentage(
          calcTaxRate(product?.salePrice, rate),
          calcTaxRate(product?.comparePrice, rate)
        )
      }
    }
  }
}

export function usePriceRange({
  product,
  taxRate = 0
}: {
  product: ProductType
  taxRate?: number
}) {
  const priceRange = useMemo(() => {
    return calcPriceRange(product, taxRate)
  }, [product, taxRate])
  return priceRange
}
