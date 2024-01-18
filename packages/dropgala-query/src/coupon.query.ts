import { gql } from '@apollo/client'

export const APPLY_COUPON = gql`
  mutation ApplyCoupon($code: String!, $storeId: String!) {
    applyCoupon(code: $code, storeId: $storeId) {
      id
      code
      discountValue
      discountType
    }
  }
`
