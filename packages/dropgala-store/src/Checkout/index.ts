import { ThunkStatus } from '@dropgala/types/enums.type'
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '../index'
import { HYDRATE } from 'next-redux-wrapper'
import { CheckoutState } from '@dropgala/types'
import { updateCheckoutInformation } from './thunks'

const initialState: CheckoutState = {
  cartId: null,
  loadingStatus: ThunkStatus.IDLE,
  email: null,
  shippingAddress: null,
  shipments: null,
  paymentConfiguration: null,
  summary: null,
  metadata: null,
  stepsConfig: null,
  status: '',
  appliedCoupon: null,
  tax: null,
  createdAt: '',
  updatedAt: ''
}

export const checkoutSlice = createSlice({
  name: 'CheckoutReducer',
  initialState,
  reducers: {
    setCheckout: (
      state: CheckoutState,
      action: PayloadAction<{ checkout: CheckoutState }>
    ) => {
      state = action.payload.checkout
      return state
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state: CheckoutState, action: AnyAction) => {
        return {
          ...state,
          ...action.payload.CheckoutReducer
        }
      })
      .addCase(updateCheckoutInformation.pending, (state) => {
        state.loadingStatus = ThunkStatus.PENDING
      })
      .addCase(
        updateCheckoutInformation.fulfilled,
        (state, action: AnyAction) => {
          state = action.payload.data
          state.loadingStatus = ThunkStatus.FULFILLED
          return state
        }
      )
      .addCase(updateCheckoutInformation.rejected, (state) => {
        state.loadingStatus = ThunkStatus.REJECTED
      })
  }
})

export const { setCheckout } = checkoutSlice.actions

export const selectCheckout = (state: AppState) => state.CheckoutReducer

export default checkoutSlice.reducer

// message Summary {
//   FinalPrice grandTotal = 1;
//   FinalPrice subtotalIncludingTax = 2;
//   FinalPrice subtotalExcludingTax = 3;
//   FinalPrice subtotalWithDiscountExcludingTax = 4;
//   FinalPrice totalShippingCost = 5;
//   Discount discount = 6;
// }
