import { ThunkStatus } from '@dropgala/types/enums.type'
import type { CartType } from '@dropgala/types/product.type'
import { isArray } from '@dropgala/utils/lodashFunctions'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '../index'
import { addItemThunk, incrementItemThunk } from './thunks'

const initialState: CartType = {
  id: null,
  items: [],
  totalQuantity: 0,
  loadingStatus: ThunkStatus.IDLE,
  total: {
    totalPrice: {
      currency: {
        code: 'USD'
      },
      value: 0
    },
    totalExclTax: {
      currency: {
        code: 'USD'
      },
      value: 0
    }
  }
}

export const cartSlice = createSlice({
  name: 'CartReducer',
  initialState,
  reducers: {
    setCart: (state: CartType, action: PayloadAction<{ state: CartType }>) => {
      state = action.payload.state
      return state
    },
    rehydrate: (state: CartType, action: PayloadAction<CartType>) => {
      if (isArray(action.payload)) {
        state = action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemThunk.pending, (state, action) => {
        state.loadingStatus = ThunkStatus.PENDING
      })
      .addCase(addItemThunk.fulfilled, (state, action) => {
        console.log('addItemThunk.fulfilled :>', { state })
        state = action.payload.data
        state.loadingStatus = ThunkStatus.FULFILLED
        return state
      })
      .addCase(addItemThunk.rejected, (state, action) => {
        state.loadingStatus = ThunkStatus.REJECTED
      })
      .addCase(incrementItemThunk.pending, (state, action) => {
        state.loadingStatus = ThunkStatus.PENDING
      })
      .addCase(incrementItemThunk.fulfilled, (state, action) => {
        console.log('FULFILLED:>>>', { state, action })
        state.loadingStatus = ThunkStatus.FULFILLED
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
        state.loadingStatus = ThunkStatus.REJECTED
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

export const { setCart, rehydrate } = cartSlice.actions

export const selectCart = (state: AppState) => state.CartReducer
export default cartSlice.reducer
