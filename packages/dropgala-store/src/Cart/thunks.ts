import { createAsyncThunk } from '@reduxjs/toolkit'
import { CART_CHANGE, REMOVE_CART_ITEM } from '@dropgala/query/cart.query'

import apolloClient from 'apollo-client'
import { CartType } from '@dropgala/types'

interface RemoveCartItemProps {
  key: string
  storeLanguageId: number
  storeId: string
  csrfToken: string
}

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async ({ storeLanguageId, key, storeId, csrfToken }: RemoveCartItemProps) => {
    const { data } = await apolloClient.mutate<any>({
      mutation: REMOVE_CART_ITEM,
      variables: {
        key,
        storeId,
        storeLanguageId
      },
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      fetchPolicy: 'no-cache'
    })
    const { removeCartItem, error } = data ?? {}
    return { data: removeCartItem, error }
  }
)

interface CartChangeProps {
  itemId: number
  storeLanguageId: number
  orderQuantity: number
  storeId: string
  orderVariationOption: { id: number } | null
  csrfToken: string
}

export const cartChange = createAsyncThunk(
  'cart/cartChange',
  async ({
    itemId,
    storeLanguageId,
    orderQuantity,
    storeId,
    orderVariationOption,
    csrfToken
  }: CartChangeProps) => {
    const { data } = await apolloClient.mutate<any>({
      mutation: CART_CHANGE,
      variables: {
        itemId,
        storeLanguageId,
        orderVariationOption,
        orderQuantity,
        storeId
      },
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      fetchPolicy: 'no-cache'
    })
    const { cartChange, error } = data ?? {}
    return { data: cartChange, error }
  }
)

export const getCartRPC = createAsyncThunk(
  'cart/getCartRPC',
  (cart: CartType, error: any) => {
    return { data: cart, error }
  }
)
