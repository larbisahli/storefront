import { StoreThemes } from '@dropgala/types/enums.type'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { ConfigType, LanguageType } from '@dropgala/types/config.type'
import { HYDRATE } from 'next-redux-wrapper'

import { AppState } from '../store'

export interface StoreConfigState extends ConfigType {
  theme: StoreThemes
}

const initialState: StoreConfigState = {
  theme: StoreThemes.LUMA,
  isMobileHeaderTransition: true,
  device: {
    userAgent: null,
    isSafari: false,
    isMobile: false,
    isDesktop: true,
    isAndroid: false,
    isIos: false,
    isSSR: false
  }
}

export const storeConfig = createSlice({
  name: 'ConfigReducer',
  initialState,
  reducers: {
    setConfig: (
      state: StoreConfigState,
      action: PayloadAction<{ storeConfig: StoreConfigState }>
    ) => {
      const storeConfig = action.payload.storeConfig
      return {
        ...state,
        ...storeConfig
      }
    },
    setLanguage: (
      state: StoreConfigState,
      action: PayloadAction<{ storeLanguage: LanguageType }>
    ) => {
      const language = action.payload.storeLanguage
      return { ...state, language }
    },
    setDefaultCurrency: (
      state: StoreConfigState,
      action: PayloadAction<{ defaultCurrency: ConfigType['defaultCurrency'] }>
    ) => {
      const defaultCurrency = action.payload.defaultCurrency
      return { ...state, defaultCurrency }
    },
    setConfigDevice: (
      state: StoreConfigState,
      action: PayloadAction<{ device: ConfigType['device'] | undefined }>
    ) => {
      const device = action.payload.device
      if (device) return { ...state, device }
      return state
    },
    setMobileHeaderTransition: (
      state: StoreConfigState,
      action: PayloadAction<{ allow: boolean }>
    ) => {
      state.isMobileHeaderTransition = action.payload.allow
    }
  },
  extraReducers: {
    [HYDRATE]: (state: StoreConfigState, action) => {
      return {
        ...state,
        ...action.payload.ConfigReducer
      }
    }
  }
})

export const {
  setConfig,
  setLanguage,
  setDefaultCurrency,
  setConfigDevice,
  setMobileHeaderTransition
} = storeConfig.actions

export const selectConfig = (state: AppState): StoreConfigState =>
  state.ConfigReducer
export const selectLanguage = (
  state: AppState
): LanguageType | null | undefined => state.ConfigReducer?.language
export default storeConfig.reducer
