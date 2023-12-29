import { ProductTypes, ThunkStatus } from '@dropgala/types/enums.type'
import type { CartItemType, CartState } from '@dropgala/types/product.type'
import { filter, isArray } from '@dropgala/utils/lodashFunctions'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import type { AppState } from '../index'
import { addItemThunk, incrementItemThunk } from './thunks'

const initialState: CartState = {
  items: [],
  coupon: {},
  status: ThunkStatus.IDLE
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
    },
    removeItem: (state: CartState, action: PayloadAction<CartItemType>) => {
      const key = action.payload.key
      state.items = filter(
        state.items,
        (item: CartItemType) => item.key !== key
      )
    },
    incrementItem: (state: CartState, action: PayloadAction<CartItemType>) => {
      const key = action.payload.key
      state.items = state?.items?.map((item) => {
        if (item.key === key) {
          item.orderQuantity! += 1
        }
        return item
      })
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemThunk.pending, (state, action) => {
        state.status = ThunkStatus.PENDING
      })
      .addCase(addItemThunk.fulfilled, (state, action) => {
        state.status = ThunkStatus.FULFILLED
        console.log({ action })
        return state
      })
      .addCase(addItemThunk.rejected, (state, action) => {
        state.status = ThunkStatus.REJECTED
      })
      .addCase(incrementItemThunk.pending, (state, action) => {
        state.status = ThunkStatus.PENDING
      })
      .addCase(incrementItemThunk.fulfilled, (state, action) => {
        console.log('FULFILLED:>>>', { state, action })
        state.status = ThunkStatus.FULFILLED
        return state
        // state.items = state.items?.map((item) => {
        //   if (item?.id === action.payload?.id) {
        //     return {
        //       ...item,
        //       ...(action.payload ?? {}),
        //       orderVariationOption: minPricedVariationOption(
        //         action.payload?.variationOptions
        //       )
        //     }
        //   }
        //   return item
        // })
      })
      .addCase(incrementItemThunk.rejected, (state, action) => {
        state.status = ThunkStatus.REJECTED
        // sentry({
        //   message: 'action.payload rejected',
        //   error: action?.error as Error
        // });
        console.log({
          message: 'action.payload rejected',
          error: action?.error as Error
        })
      })
  }
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
