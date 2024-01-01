import { ProductTypes } from '@dropgala/types'
import { CartType, ProductType } from '@dropgala/types/product.type'
import { useMemo } from 'react'

export const UseCartItemsTotalPrice = (cart: CartType) => {
  const cartItemsTotalPrice = (items: ProductType[]) => {
    let total = items.reduce((total: number, product: ProductType) => {
      const isVariableType = product.type === ProductTypes.Variable
      const selectedPrice = isVariableType
        ? product?.orderVariationOption?.price?.finalPrice?.value
        : product.price?.finalPrice?.value
      return total + selectedPrice! * product.orderQuantity!
    }, 0)

    return total
  }

  const itemCount = useMemo(
    () => Number(cartItemsTotalPrice(cart.items).toFixed(2)),
    [cart]
  )
  return itemCount
}

export const UseCartItemsTotalPriceExclTax = (cart: CartType) => {
  const cartItemsTotalPrice = (items: ProductType[]) => {
    let total = items.reduce((total: number, product: ProductType) => {
      const isVariableType = product.type === ProductTypes.Variable
      const selectedTaxPrice = isVariableType
        ? product?.orderVariationOption?.price?.finalPriceExclTax.value
        : product.price?.finalPriceExclTax?.value
      return total + selectedTaxPrice! * product.orderQuantity!
    }, 0)
    return total
  }

  const itemCount = useMemo(
    () => Number(cartItemsTotalPrice(cart.items).toFixed(2)),
    [cart]
  )
  return itemCount
}
