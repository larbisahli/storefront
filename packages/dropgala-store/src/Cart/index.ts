import { ThunkStatus } from '@dropgala/types/enums.type'
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '../index'
import { cartChange, removeCartItem } from './thunks'
import { HYDRATE } from 'next-redux-wrapper'
import { CartType } from '@dropgala/types'

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
    setCart: (state: CartType, action: PayloadAction<{ cart: CartType }>) => {
      const cart = action.payload.cart
      return { ...state, ...cart }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state: CartType, action: AnyAction) => {
        return {
          ...state,
          ...action.payload.CartReducer
        }
      })
      .addCase(cartChange.pending, (state) => {
        state.loadingStatus = ThunkStatus.PENDING
      })
      .addCase(cartChange.fulfilled, (state, action: AnyAction) => {
        state = action.payload.data
        state.loadingStatus = ThunkStatus.FULFILLED
        return state
      })
      .addCase(cartChange.rejected, (state) => {
        state.loadingStatus = ThunkStatus.REJECTED
      })
      .addCase(removeCartItem.pending, (state) => {
        state.loadingStatus = ThunkStatus.PENDING
      })
      .addCase(removeCartItem.fulfilled, (state, action: AnyAction) => {
        state = action.payload.data
        state.loadingStatus = ThunkStatus.FULFILLED
        return state
      })
      .addCase(removeCartItem.rejected, (state, action) => {
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

export const { setCart } = cartSlice.actions

export const selectCart = (state: AppState) => state.CartReducer
export default cartSlice.reducer
