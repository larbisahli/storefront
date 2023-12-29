import { gql } from '@apollo/client'

export const INCREMENT_ITEM = gql`
  mutation IncrementItem($cartId: String!, $storeId: String!, $itemId: Int!) {
    incrementItem(cartId: $cartId, itemId: $itemId, storeId: $storeId) {
      id
    }
  }
`

export const DECREMENT_ITEM = gql`
  mutation DecrementItem($cartId: String!, $storeId: String!, $itemId: Int!) {
    decrementItem(cartId: $cartId, itemId: $itemId, storeId: $storeId) {
      id
    }
  }
`

export const ADD_ITEM = gql`
  mutation AddItem($cartId: String!, $storeId: String!, $itemId: Int!) {
    addItem(cartId: $cartId, storeId: $storeId, itemId: $itemId) {
      id
    }
  }
`
