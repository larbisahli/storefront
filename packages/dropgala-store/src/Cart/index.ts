import { ProductTypes, ThunkStatus } from '@dropgala/types/enums.type'
import type { CartItemType, CartType } from '@dropgala/types/product.type'
import { isArray } from '@dropgala/utils/lodashFunctions'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '../index'
import { cartChange, incrementItemThunk } from './thunks'

const initialState: CartType = {
  id: null,
  items: [],
  totalQuantity: 0,
  loadingStatus: ThunkStatus.IDLE,
  total: {
    totalPrice: {
      value: 0
    },
    totalExclTax: {
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
      .addCase(cartChange.pending, (state, action) => {
        state.loadingStatus = ThunkStatus.PENDING
      })
      .addCase(cartChange.fulfilled, (state, action) => {
        state = action.payload.data
        state.loadingStatus = ThunkStatus.FULFILLED
        return state
      })
      .addCase(cartChange.rejected, (state, action) => {
        state.loadingStatus = ThunkStatus.REJECTED
      })
      .addCase(incrementItemThunk.pending, (state, action) => {
        state.loadingStatus = ThunkStatus.PENDING
      })
      .addCase(incrementItemThunk.fulfilled, (state, action) => {
        console.log('FULFILLED:>>>', { state, action })
        state.loadingStatus = ThunkStatus.FULFILLED
        return state
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
