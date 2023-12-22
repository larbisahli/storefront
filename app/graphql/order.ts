import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $firstName: String!
    $lastName: String!
    $email: String!
    $address1: String!
    $address2: String
    $country: CountryInput
    $subscribe: Boolean!
    $city: String!
    $state: String
    $zipCode: String
    $orderShipping: OrderShippingInput
    $paymentMethod: PaymentMethodInput
  ) {
    createOrder(
      firstName: $firstName
      lastName: $lastName
      email: $email
      address1: $address1
      address2: $address2
      country: $country
      subscribe: $subscribe
      city: $city
      state: $state
      zipCode: $zipCode
      orderShipping: $orderShipping
      paymentMethod: $paymentMethod
    ) {
      id
      code
    }
  }
`
