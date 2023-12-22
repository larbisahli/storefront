import { ProductTypes } from '@dropgala/types'
import { CartState, ProductType } from '@dropgala/types/product.type'
import { CouponType } from '@dropgala/types/coupon.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { useMemo } from 'react'

export const UseCartItemsTotalPrice = (cart: CartState) => {
  const cartItemsTotalPrice = (items: ProductType[], coupon: CouponType) => {
    let total = items.reduce((total: number, product: ProductType) => {
      const isVariableType = product.type === ProductTypes.Variable
      const selectedPrice = isVariableType
        ? product?.orderVariationOption?.price?.finalPrice?.value
        : product.price?.finalPrice?.value
      return total + selectedPrice! * product.orderQuantity!
    }, 0)

    const discount = !isEmpty(coupon)
      ? (total * Number(coupon?.discountValue)) / 100
      : 0

    return total - discount
  }

  const itemCount = useMemo(
    () => Number(cartItemsTotalPrice(cart.items, cart.coupon).toFixed(2)),
    [cart]
  )
  return itemCount
}

export const UseCartItemsTotalPriceExclTax = (cart: CartState) => {
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
