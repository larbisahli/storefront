import { StoreThemes } from '@dropgala/types/enums.type'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { ConfigType, LanguageType } from '@dropgala/types/config.type'
import { HYDRATE } from 'next-redux-wrapper'

import { AppState } from '../store'

export interface StoreConfigState extends ConfigType {
  theme: StoreThemes
}

const initialState: StoreConfigState = {
  theme: StoreThemes.LUMA
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
        ...storeConfig
      }
    },
    setLanguage: (
      state: StoreConfigState,
      action: PayloadAction<{ storeLanguage: LanguageType }>
    ) => {
      const language = action.payload.storeLanguage
      return { ...state, language }
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.ConfigReducer
      }
    }
  }
})

export const { setConfig, setLanguage } = storeConfig.actions

export const selectConfig = (state: AppState): StoreConfigState =>
  state.ConfigReducer
export const selectLanguage = (
  state: AppState
): LanguageType | null | undefined => state.ConfigReducer?.language
export default storeConfig.reducer
