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
  region: string
  subregion: string
  phone_code: string
  currency: string
}

export type CheckoutFormValues = {
  firstName: string
  lastName: string
  email: string
  address1: string
  address2?: string
  country: CountryType
  subscribe: boolean
  city: string
  state: string
  zipCode: string
  orderShipping?: { id: string }
  paymentMethod?: { id: string }
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
