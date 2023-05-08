import { CartState } from '@dropgala/types/product.type'
import { useMemo } from 'react'

export const useCartItemsCount = (cart: CartState) => {
  const { items } = cart
  const itemsCount = useMemo(
    () =>
      items?.reduce((acc, item) => {
        return acc + item?.orderQuantity
      }, 0),
    [items]
  )
  return itemsCount ?? 0
}
