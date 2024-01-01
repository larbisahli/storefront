import { ThunkStatus } from '@dropgala/types/enums.type'
import type { CheckoutState } from '@dropgala/types/product.type'
import { isArray } from '@dropgala/utils/lodashFunctions'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '../index'
import { incrementItemThunk } from './thunks'

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
    setCheckoutInit: (
      state: CheckoutState,
      action: PayloadAction<{ state: CheckoutState }>
    ) => {
      state = action.payload.state
      return state
    },
    rehydrate: (state: CheckoutState, action: PayloadAction<CheckoutState>) => {
      if (isArray(action.payload)) {
        state = action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(incrementItemThunk.rejected, (state, action) => {
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

export const { setCheckoutInit, rehydrate } = checkoutSlice.actions

export const selectCheckout = (state: AppState) => state.CheckoutReducer

export default checkoutSlice.reducer
