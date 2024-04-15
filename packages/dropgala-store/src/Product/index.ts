import type { HeroBannerType } from '@dropgala/types/slider.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { AppState } from '../store'

export interface ProductState {}

const initialState: ProductState = {
  heroSliderList: [],
  promoBanner: null
}

export const Product = createSlice({
  name: 'ProductReducer',
  initialState,
  reducers: {
    setProduct: (
      state: ProductState,
      action: PayloadAction<{ items: HeroBannerType[] }>
    ) => {
      state = action.payload.items
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.BannerReducer
      }
    }
  }
})

export const { setProduct } = Product.actions

export const selectBanner = (state: AppState): ProductState =>
  state.ProductReducer

export default Product.reducer
