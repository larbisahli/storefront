import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  CART_CHANGE,
  DECREMENT_ITEM,
  INCREMENT_ITEM
} from '@dropgala/query/cart.query'

import apolloClient from 'apollo-client'

export const incrementItemThunk = createAsyncThunk(
  'cart/incrementItem',
  async ({
    cartId,
    itemId,
    storeId,
    csrfToken
  }: {
    cartId: string
    itemId: number
    storeId: string
    csrfToken: string
  }) => {
    const { data } = await apolloClient.mutate<any>({
      mutation: INCREMENT_ITEM,
      variables: {
        cartId,
        itemId,
        storeId
      },
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      fetchPolicy: 'no-cache'
    })
    console.log({ data })
    const { incrementItem, error } = data ?? {}
    return { data: incrementItem, error }
  }
)

export const decrementItemThunk = createAsyncThunk(
  'cart/decrementItem',
  async ({
    cartId,
    itemId,
    storeId,
    csrfToken
  }: {
    cartId: string
    itemId: number
    storeId: string
    csrfToken: string
  }) => {
    const { data } = await apolloClient.mutate<any>({
      mutation: DECREMENT_ITEM,
      variables: {
        cartId,
        itemId,
        storeId
      },
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      fetchPolicy: 'no-cache'
    })
    console.log({ data })
    const { decrementItem, error } = data ?? {}
    return { data: decrementItem, error }
  }
)

interface CartChangeThunkProps {
  itemId: number
  storeLanguageId: number
  orderQuantity: number
  storeId: string
  orderVariationOption: { id: number } | null
  csrfToken: string
}

export const cartChange = createAsyncThunk(
  'cart/cartChangeThunk',
  async ({
    itemId,
    storeLanguageId,
    orderQuantity,
    storeId,
    orderVariationOption,
    csrfToken
  }: CartChangeThunkProps) => {
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
