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

export type CheckoutFormValues = {
  first_name: string
  last_name: string
  email: string
  address1: string
  address2: string
  country: { name: string; iso2: string }
  subscribe: boolean
  city: string
  state: string
  zip_code: string
  order_shipping: { id: string }
}
