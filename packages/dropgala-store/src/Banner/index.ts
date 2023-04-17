import type { HeroBannerType } from '@dropgala/types/slider.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppState } from '../store'

export interface BannerState {
  heroSliderList: HeroBannerType[]
}

const initialState: BannerState = {
  heroSliderList: []
}

export const Banner = createSlice({
  name: 'Banner',
  initialState,
  reducers: {
    setHeroSlide: (
      state: BannerState,
      action: PayloadAction<{ items: HeroBannerType[] }>
    ) => {
      state.heroSliderList = action.payload.items
    }
  }
})

export const { setHeroSlide } = Banner.actions

export const selectBanner = (state: AppState): BannerState =>
  state.BannerReducer
export const selectHeroSlider = (state: AppState): HeroBannerType[] =>
  state.BannerReducer.heroSliderList

export default Banner.reducer
