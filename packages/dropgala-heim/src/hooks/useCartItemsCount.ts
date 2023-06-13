import { CartItemType } from '@dropgala/types/product.type'
import { useMemo } from 'react'

export const useCartItemsCount = (items: CartItemType[]) => {
  const itemsCount = useMemo(
    () =>
      items?.reduce((acc, item) => {
        return acc + (item?.orderQuantity ?? 0)
      }, 0),
    [items]
  )
  return itemsCount ?? 0
}
