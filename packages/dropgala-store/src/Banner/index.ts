import type {
  HeroBannerType,
  PromoBannerType
} from '@dropgala/types/slider.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { AppState } from '../store'

export interface BannerState {
  heroSliderList: HeroBannerType[]
  promoBanner: PromoBannerType | null
}

const initialState: BannerState = {
  heroSliderList: [],
  promoBanner: null
}

export const Banner = createSlice({
  name: 'BannerReducer',
  initialState,
  reducers: {
    setHeroSlide: (
      state: BannerState,
      action: PayloadAction<{ items: HeroBannerType[] }>
    ) => {
      state.heroSliderList = action.payload.items
    },
    setPromoBanner: (
      state: BannerState,
      action: PayloadAction<{ banner: PromoBannerType | null }>
    ) => {
      state.promoBanner = action.payload.banner
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

export const { setHeroSlide, setPromoBanner } = Banner.actions

export const selectBanner = (state: AppState): BannerState =>
  state.BannerReducer
export const selectHeroSlider = (state: AppState): HeroBannerType[] =>
  state.BannerReducer.heroSliderList
export const selectPromoBanner = (state: AppState): PromoBannerType | null =>
  state.BannerReducer.promoBanner

export default Banner.reducer
