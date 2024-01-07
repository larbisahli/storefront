import { gql } from '@apollo/client'

export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem(
    $storeId: String!
    $key: String!
    $storeLanguageId: Int!
  ) {
    removeCartItem(
      storeId: $storeId
      key: $key
      storeLanguageId: $storeLanguageId
    ) {
      id
      totalQuantity
      items {
        id
        key
        name
        sku
        slug
        type
        quantity
        thumbnail {
          image
          placeholder
        }
        price {
          salePrice
          maxSalePrice
          minSalePrice
          comparePrice
          maxComparePrice
          minComparePrice
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
export const CART_CHANGE = gql`
  mutation CartChange(
    $storeId: String!
    $storeLanguageId: Int!
    $itemId: Int!
    $orderQuantity: Int!
    $orderVariationOption: OrderVariationOptionInput
  ) {
    cartChange(
      storeId: $storeId
      storeLanguageId: $storeLanguageId
      itemId: $itemId
      orderQuantity: $orderQuantity
      orderVariationOption: $orderVariationOption
    ) {
      id
      totalQuantity
      items {
        id
        key
        name
        sku
        type
        slug
        quantity
        thumbnail {
          image
          placeholder
        }
        price {
          salePrice
          maxSalePrice
          minSalePrice
          comparePrice
          maxComparePrice
          minComparePrice
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
