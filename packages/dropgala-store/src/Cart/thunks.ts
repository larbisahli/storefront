import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  CART_CHANGE,
  REMOVE_CART_ITEM
} from '@dropgala/query/graphql/client/schema/cart.query'

import { initializeApollo } from '@dropgala/query/graphql/client'

interface RemoveCartItemProps {
  key: string
  languageId: number
  storeId: string
  csrfToken: string
}

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async ({ languageId, key, storeId, csrfToken }: RemoveCartItemProps) => {
    const apolloClient = initializeApollo()
    const { data } = await apolloClient.mutate<any>({
      mutation: REMOVE_CART_ITEM,
      variables: {
        key,
        storeId,
        languageId
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
  languageId: number
  orderQuantity: number
  storeId: string
  orderVariationOption: { id: number } | null
  csrfToken: string
}

export const cartChange = createAsyncThunk(
  'cart/cartChange',
  async ({
    itemId,
    languageId,
    orderQuantity,
    storeId,
    orderVariationOption,
    csrfToken
  }: CartChangeProps) => {
    const apolloClient = initializeApollo()
    const { data } = await apolloClient.mutate<any>({
      mutation: CART_CHANGE,
      variables: {
        itemId,
        languageId,
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
