import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  UPDATE_CHECKOUT_INFORMATION,
  UPDATE_CHECKOUT_SHIPPING
} from '@dropgala/query/checkout.query'
import apolloClient from 'apollo-client'
import { ShippingAddress } from '@dropgala/types'
interface updateCheckoutThunkProps extends ShippingAddress {
  storeId: string
  csrfToken: string
}

export const updateCheckoutInformation = createAsyncThunk(
  'cart/updateCheckoutInformationThunk',
  async ({
    storeId,
    city,
    marketingOptIn,
    zip,
    state,
    address,
    email,
    country,
    phone,
    fullName,
    csrfToken
  }: updateCheckoutThunkProps) => {
    const { data } = await apolloClient.mutate<any>({
      mutation: UPDATE_CHECKOUT_INFORMATION,
      variables: {
        storeId,
        city,
        marketingOptIn,
        zip,
        state,
        address,
        email,
        country,
        phone,
        fullName
      },
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      fetchPolicy: 'no-cache'
    })
    const { updateCheckoutInformation, error } = data ?? {}
    return { data: updateCheckoutInformation, error }
  }
)

export const updateCheckoutShipping = createAsyncThunk(
  'cart/updateCheckoutShippingThunk',
  async ({ id, csrfToken }: { id: number; csrfToken: string }) => {
    const { data } = await apolloClient.mutate<any>({
      mutation: UPDATE_CHECKOUT_SHIPPING,
      variables: { id },
      context: {
        headers: {
          'x-csrf-token': csrfToken
        }
      },
      fetchPolicy: 'no-cache'
    })
    const { updateCheckoutShipping, error } = data ?? {}
    return { data: updateCheckoutShipping, error }
  }
)
