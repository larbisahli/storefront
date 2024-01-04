import { ProductTypes } from '@dropgala/types'
import { CartItemType, CartType } from '@dropgala/types/product.type'
import { useMemo } from 'react'
import { calcTaxRate } from 'utils'

const getCartItemsTotalPrice = (items: CartItemType[], rate: number) => {
  let total = items!.reduce((total: number, item: CartItemType) => {
    const isVariableType = item!.type === ProductTypes.Variable
    const selectedPrice = isVariableType
      ? calcTaxRate(item?.orderVariationOption?.salePrice, rate)
      : calcTaxRate(item?.price?.salePrice, rate)
    return total + (Number(selectedPrice) ?? 0) * item.orderQuantity!
  }, 0)
  return total
}

const getCartItemsTotalPriceExclTax = (items: CartItemType[]) => {
  let total = items!.reduce((total: number, item: CartItemType) => {
    const isVariableType = item!.type === ProductTypes.Variable
    const selectedTaxPrice = isVariableType
      ? item?.orderVariationOption?.salePrice
      : item.price?.salePrice
    return total + (Number(selectedTaxPrice) ?? 0) * item.orderQuantity!
  }, 0)
  return total
}

export function useCartTotal({
  cart,
  taxRate = 0
}: {
  cart: CartType
  taxRate?: number
}) {
  const priceRange = useMemo(() => {
    return {
      totalPrice: {
        value: getCartItemsTotalPrice(cart.items, taxRate)
      },
      totalExclTax: {
        value: getCartItemsTotalPriceExclTax(cart.items)
      }
    }
  }, [cart, taxRate])
  return priceRange
}
