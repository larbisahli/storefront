import { ThunkStatus } from '@dropgala/types/enums.type'
import type { CheckoutState } from '@dropgala/types/product.type'
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '../index'
import { HYDRATE } from 'next-redux-wrapper'

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
    builder.addCase(HYDRATE, (state: CheckoutState, action: AnyAction) => {
      return {
        ...state,
        ...action.payload.CheckoutReducer
      }
    })
    // .addCase(incrementItemThunk.rejected, (state, action) => {
    //   state.loadingStatus = ThunkStatus.REJECTED
    //   // sentry({
    //   //   message: 'action.payload rejected',
    //   //   error: action?.error as Error
    //   // });
    //   console.log({
    //     message: 'action.payload rejected',
    //     error: action?.error as Error
    //   })
    // })
  }
})

export const { setCheckout } = checkoutSlice.actions

export const selectCheckout = (state: AppState) => state.CheckoutReducer

export default checkoutSlice.reducer
