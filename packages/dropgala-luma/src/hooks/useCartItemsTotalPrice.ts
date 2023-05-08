import { ProductTypes } from '@dropgala/types'
import { CartState, ProductType } from '@dropgala/types/product.type'
import { isEmpty } from '@dropgala/utils/lodashFunctions'
import { useMemo } from 'react'

export const UseCartItemsTotalPrice = (cart: CartState) => {
  const cartItemsTotalPrice = (items: ProductType[], coupon = null) => {
    let total = items.reduce((salePrice: number, product: ProductType) => {
      const isVariableType = product.type!.id === ProductTypes.Variable
      const selectedPrice = isVariableType
        ? product?.orderVariationOption?.salePrice ?? product.salePrice
        : product.salePrice
      return salePrice + selectedPrice! * product.orderQuantity!
    }, 0)

    const discount = !isEmpty(coupon)
      ? (total * Number(coupon.discountInPercent)) / 100
      : 0

    return total - discount
  }

  const itemCount = useMemo(
    () => Number(cartItemsTotalPrice(cart.items, cart.coupon).toFixed(2)),
    [cart]
  )
  return itemCount
}
