import { createAsyncThunk } from '@reduxjs/toolkit'
import { CART_CHANGE } from '@dropgala/query/cart.query'

import apolloClient from 'apollo-client'
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
