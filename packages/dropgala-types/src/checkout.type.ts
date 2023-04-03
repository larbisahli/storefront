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
