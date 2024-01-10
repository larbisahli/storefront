import { createAsyncThunk } from '@reduxjs/toolkit'
import { UPDATE_CHECKOUT_INFORMATION } from '@dropgala/query/checkout.query'
import apolloClient from 'apollo-client'
import { ShippingAddress } from '@dropgala/types'
interface updateCheckoutThunkProps extends ShippingAddress {
  csrfToken: string
}

export const updateCheckoutInformation = createAsyncThunk(
  'cart/updateCheckoutInformationThunk',
  async ({
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
