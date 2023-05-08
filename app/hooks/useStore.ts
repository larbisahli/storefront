import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { selectCart } from '@dropgala/store'
import type { AppDispatch, AppState } from '@dropgala/store'
import { ProductType } from '@dropgala/types/product.type'
import { useMemo } from 'react'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const useIsInCart = (id?: number) => {
  const { items } = useAppSelector(selectCart)
  const inCart = useMemo(
    () => items?.some((item: ProductType) => item.id === id),
    [items, id]
  )
  return inCart
}

export const useGetItem = (id: number) => {
  const { items } = useAppSelector(selectCart)
  const item = useMemo(
    () => items?.find((item: ProductType) => item.id === id),
    [items, id]
  )
  return item
}

export const useGetItems = (id: number) => {
  const { items } = useAppSelector(selectCart)
  const item = useMemo(
    () => items?.filter((item: ProductType) => item.id === id),
    [items, id]
  )
  return item
}

export const useCartItemsCount = () => {
  const { items } = useAppSelector(selectCart)
  const itemsCount = useMemo(
    () =>
      items?.reduce((acc, item) => {
        return acc + item?.orderQuantity
      }, 0),
    [items]
  )
  return itemsCount ?? 0
}
