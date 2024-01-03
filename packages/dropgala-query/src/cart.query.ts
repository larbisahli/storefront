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
// cartChange
export const ADD_ITEM = gql`
  mutation AddItem(
    $storeId: String!
    $storeLanguageId: Int!
    $itemId: Int!
    $orderQuantity: Int!
    $orderVariationOption: OrderVariationOptionInput
  ) {
    addItem(
      storeId: $storeId
      storeLanguageId: $storeLanguageId
      itemId: $itemId
      orderQuantity: $orderQuantity
      orderVariationOption: $orderVariationOption
    ) {
      id
      totalQuantity
      total {
        totalPrice {
          currency {
            code
          }
          value
        }
        totalExclTax {
          currency {
            code
          }
          value
        }
      }
      items {
        id
        key
        name
        sku
        type
        quantity
        thumbnail {
          image
          placeholder
        }
        price {
          finalPrice {
            currency {
              code
            }
            value
          }
          finalPriceExclTax {
            currency {
              code
            }
            value
          }
          discount {
            amountOff
            percentOff
          }
        }
        orderQuantity
        orderVariationOption {
          id
          sku
          title
          thumbnail {
            image
            placeholder
          }
          options
          salePrice
          comparePrice
          quantity
        }
      }
    }
  }
`

//       cartId
//       email
//       cart {}
//       shippingAddress {
//         city
//       }
//       shipments {
//         id
//       }
//       paymentConfiguration {
//         id
//       }
//       metadata {
//         ip
//         geo {
//           city
//           region
//         }
//       }
//       stepsConfig {
//         availableSteps
//         currentStep
//       }
//       status
//       appliedCoupon {
//         code
//       }
//       tax {
//         label
//       }
//       summary {
//         grandTotal {
//           currency {
//             code
//           }
//           value
//         }
//         subtotalIncludingTax {
//           currency {
//             code
//           }
//           value
//         }
//         subtotalExcludingTax {
//           currency {
//             code
//           }
//           value
//         }
//         subtotalWithDiscountExcludingTax {
//           currency {
//             code
//           }
//           value
//         }
//         totalShippingCost {
//           currency {
//             code
//           }
//           value
//         }
//         discount {
//           label
//           amount {
//             currency {
//              code
//             }
//             value
//           }
//         }
//       }
