import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  ADD_ITEM,
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
    const { cart, error } = data ?? {}
    return { cart, error }
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
    const { cart, error } = data ?? {}
    return { cart, error }
  }
)

export const addItemThunk = createAsyncThunk(
  'cart/addItemThunk',
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
      mutation: ADD_ITEM,
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
    console.log('AddItemThunk :>>', { data })
    const { cart, error } = data ?? {}
    return { cart, error }
  }
)
