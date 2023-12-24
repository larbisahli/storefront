import { gql } from '@apollo/client'

export const INCREMENT_ITEM = gql`
  mutation IncrementItem(
    $cartId: String!
    $itemId: String!
    $storeId: String!
  ) {
    incrementItem(cartId: $cartId, itemId: $itemId, storeId: $storeId) {
      id
    }
  }
`

export const DECREMENT_ITEM = gql`
  mutation DecrementItem(
    $cartId: String!
    $itemId: String!
    $storeId: String!
  ) {
    decrementItem(cartId: $cartId, itemId: $itemId, storeId: $storeId) {
      id
    }
  }
`

export const ADD_ITEM = gql`
  mutation AddItem($cartId: String, $storeId: String!) {
    addItem(cartId: $cartId, storeId: $storeId) {
      id
    }
  }
`
