import { Nullable } from 'custom.type'

export interface PaymentIntentType {
  paymentIntent: string | null
  clientSecret: string | null
}

export interface StripeOptionsType {
  clientSecret: string
  appearance: {
    theme: 'stripe'
    variables: { colorPrimary: string }
  }
}

export type CountryType = {
  name: string
  iso2: string
  region?: string
  subregion?: string
  phone_code?: string
  currency?: string
}

export type CheckoutFormValues = {
  fullName: Nullable<string>
  email: Nullable<string>
  address: Nullable<string>
  country: CountryType
  marketingOptIn?: boolean
  city: Nullable<string>
  state?: Nullable<string>
  zip?: Nullable<string>
  phone?: Nullable<string>
}

export interface OrderType {
  items: {
    id: string
    orderQuantity: number
    orderVariationOption: { id: string }
  }[]
  clientSecret?: string | null
  paymentIntent?: string | null
}

export interface PaymentIntentType {
  paymentIntent: string | null
  clientSecret: string | null
}

export interface StripeOptionsType {
  clientSecret: string
  appearance: {
    theme: 'stripe'
    variables: { colorPrimary: string }
  }
}
