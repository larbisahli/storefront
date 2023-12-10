// import { Request } from '@graphql/index';
// import { PRODUCT_CART } from '@graphql/queries/product';
import { ProductTypes, localStorageKeyNames } from '@dropgala/types/enums.type'
import type { CartItemType, CartState } from '@dropgala/types/product.type'
import BrowserDatabase, {
  ONE_MONTH_IN_SECONDS
} from '@dropgala/utils/BrowserDatabase'
import { filter, isArray } from '@dropgala/utils/lodashFunctions'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import type { AppState } from '../index'

export const fetchProductInfo = createAsyncThunk(
  'cart/fetchProductInfo',
  async (id: string) => {
    // const response = await Request(PRODUCT_CART, { id });
    // return response?.productCart;
    return { id, variationOptions: [] }
  }
)

const initialState: CartState = {
  items: [],
  coupon: {}
}

const updateBrowserDatabase = (state: CartState) => {
  BrowserDatabase.setItem(
    state,
    localStorageKeyNames.CART_TOTALS,
    ONE_MONTH_IN_SECONDS
  )
}

export const cartSlice = createSlice({
  name: 'CartReducer',
  initialState,
  reducers: {
    addItem: (state: CartState, action: PayloadAction<CartItemType>) => {
      const {
        variationOptions,
        variations,
        orderQuantity = 1,
        ...rest
      } = action.payload

      state.items.unshift({
        orderQuantity,
        key: nanoid(), // Important for product variations
        variationOptions: variationOptions ?? [],
        variations: variations ?? [],
        ...rest
      })
      updateBrowserDatabase(state)
    },
    updateItem: (state: CartState, action: PayloadAction<CartItemType>) => {
      const updatedItem = action.payload
      state.items = state.items?.map((item) => {
        if (item.id === updatedItem.id) {
          item = { ...item, ...updatedItem }
          if (item.type === ProductTypes.Variable) {
            const orderOption = item.orderVariationOption
            const selectedOption = item.variationOptions?.find(
              (v) => v.id === orderOption?.id
            )

            item.orderVariationOption = selectedOption
            if (
              selectedOption?.quantity !== 0 &&
              item?.orderQuantity! > selectedOption?.quantity!
            ) {
              item.orderQuantity = selectedOption?.quantity!
            }
          } else if (
            item.type === ProductTypes.Simple &&
            updatedItem.quantity !== 0 &&
            item?.orderQuantity! > updatedItem.quantity!
          ) {
            item.orderQuantity = item.quantity!
          }
        }
        return item
      })
      updateBrowserDatabase(state)
    },
    removeItem: (state: CartState, action: PayloadAction<CartItemType>) => {
      const key = action.payload.key
      state.items = filter(
        state.items,
        (item: CartItemType) => item.key !== key
      )
      updateBrowserDatabase(state)
    },
    incrementItem: (state: CartState, action: PayloadAction<CartItemType>) => {
      const key = action.payload.key
      state.items = state?.items?.map((item) => {
        if (item.key === key) {
          item.orderQuantity! += 1
        }
        return item
      })
      updateBrowserDatabase(state)
    },
    decrementItem: (state: CartState, action: PayloadAction<CartItemType>) => {
      const key = action.payload.key
      const item = state?.items?.find((item: CartItemType) => item.key === key)
      if (item?.orderQuantity! > 1) {
        state.items = state?.items?.map((item) => {
          if (item.key === key) {
            item.orderQuantity! -= 1
          }
          return item
        })
      } else {
        state.items = filter(
          state.items,
          (item: CartItemType) => item.key !== key
        )
      }
      updateBrowserDatabase(state)
    },
    setOrderQuantity: (
      state: CartState,
      action: PayloadAction<CartItemType>
    ) => {
      const id = action.payload.id
      const key = action.payload.key
      const type = action.payload.type
      const orderQuantity = action.payload.orderQuantity!

      state.items = state?.items?.map((item) => {
        if (type === ProductTypes.Variable) {
          if (item.key === key) {
            const optionQuantity = item.orderVariationOption?.quantity!
            if (item.orderQuantity! + orderQuantity > optionQuantity) {
              item.orderQuantity = optionQuantity
            } else {
              item.orderQuantity! += orderQuantity!
            }
          }
        } else if (item.type === ProductTypes.Simple) {
          if (item.id === id) {
            if (item.orderQuantity! + orderQuantity > item.quantity!) {
              item.orderQuantity = item.quantity
            } else {
              item.orderQuantity! += orderQuantity
            }
          }
        }
        return item
      })
      updateBrowserDatabase(state)
    },
    setOrderVariationOption: (
      state: CartState,
      action: PayloadAction<{
        key: string
        orderVariationOption: CartItemType['orderVariationOption']
      }>
    ) => {
      const key = action.payload.key
      const orderVariationOption = action.payload.orderVariationOption
      state.items = state?.items?.map((item) => {
        if (item.key === key) {
          item.orderVariationOption = orderVariationOption
        }
        return item
      })
      updateBrowserDatabase(state)
    },
    setCartInit: (
      state: CartState,
      action: PayloadAction<{ state: CartState }>
    ) => {
      state = action.payload.state
      return state
    },
    rehydrate: (state: CartState, action: PayloadAction<CartItemType[]>) => {
      if (isArray(action.payload)) {
        state.items = action.payload
      } else {
        state.items = []
      }
    }
  }
  // extraReducers: (builder) => {
  //   builder.addCase(fetchProductInfo.fulfilled, (state, action) => {
  //     state.items = state.items?.map((item) => {
  //       if (item?.id === action.payload?.id) {
  //         return {
  //           ...item,
  //           ...(action.payload ?? {}),
  //           orderVariationOption: minPricedVariationOption(
  //             action.payload?.variationOptions
  //           )
  //         }
  //       }
  //       return item
  //     })
  //   })
  //   builder.addCase(fetchProductInfo.rejected, (_, action) => {
  //     // sentry({
  //     //   message: 'action.payload rejected',
  //     //   error: action?.error as Error
  //     // });
  //     console.log({
  //       message: 'action.payload rejected',
  //       error: action?.error as Error
  //     })
  //   })
  // }
})

export const {
  addItem,
  removeItem,
  updateItem,
  incrementItem,
  decrementItem,
  setOrderQuantity,
  setCartInit,
  rehydrate,
  setOrderVariationOption
} = cartSlice.actions

export const selectCart = (state: AppState) => state.CartReducer

export default cartSlice.reducer
