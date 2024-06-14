import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { AppState } from '../store'
import { ProductType } from '@dropgala/types/product.type'

export interface ProductState {
  product: ProductType
}

const initialState: ProductState = {
  product: {}
}

export const Product = createSlice({
  name: 'ProductReducer',
  initialState,
  reducers: {
    setProduct: (
      state: ProductState,
      action: PayloadAction<{ product: ProductType }>
    ) => {
      state.product = action.payload.product
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.ProductReducer
      }
    }
  }
})

export const { setProduct } = Product.actions

export const selectProduct = (state: AppState): ProductState =>
  state.ProductReducer

export default Product.reducer
