import { gql } from '@apollo/client'

export const UPDATE_CHECKOUT_INFORMATION = gql`
  mutation UpdateCheckoutInformation(
    $storeId: String!
    $city: String
    $marketingOptIn: Boolean
    $zip: String
    $state: String
    $address: String
    $email: String
    $country: CountryInput
    $phone: String
    $fullName: String
  ) {
    updateCheckoutInformation(
      storeId: $storeId
      city: $city
      marketingOptIn: $marketingOptIn
      zip: $zip
      state: $state
      address: $address
      email: $email
      country: $country
      phone: $phone
      fullName: $fullName
    ) {
      cartId
      storeId
      email
      shippingAddress {
        city
        marketingOptIn
        zip
        state
        address
        email
        country {
          iso2
          name
        }
        phone
        fullName
      }
      shipment {
        id
      }
      paymentConfiguration {
        id
      }
      metadata {
        ip
      }
      stepsConfig {
        availableSteps
        currentStep
      }
      status
      appliedCoupon {
        code
      }
    }
  }
`

export const UPDATE_CHECKOUT_SHIPPING = gql`
  mutation UpdateCheckoutShipping($id: Int!) {
    updateCheckoutShipping(id: $id) {
      cartId
      storeId
      email
      shippingAddress {
        city
        marketingOptIn
        zip
        state
        address
        email
        country {
          iso2
          name
        }
        phone
        fullName
      }
      shipment {
        id
      }
      paymentConfiguration {
        id
      }
      metadata {
        ip
      }
      stepsConfig {
        availableSteps
        currentStep
      }
      status
      appliedCoupon {
        code
      }
    }
  }
`

export const CREATE_ORDER = gql`
  mutation CreateOrder($storeId: String!, $paymentId: String!) {
    createOrder(storeId: $storeId, paymentId: $paymentId) {
      success
      ref
    }
  }
`

export const GET_ORDER_SUMMARY = gql`
  query GetOrderSummary($storeId: String!, $orderId: String!) {
    getOrderSummary(storeId: $storeId, orderId: $orderId) {
      orderNumber
      tax {
        name
        rate
      }
      currency {
        code
      }
      payment {
        code
        data
      }
      customer {
        fullName
      }
      totalQuantity
      grandTotalInclTax
      grandTotalExclTax
      subTotalInclTax
      subTotalExclTax
      discountAmount
    }
  }
`
