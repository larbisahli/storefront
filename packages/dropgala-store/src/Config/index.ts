import type { StoreThemes } from '@dropgala/types/enums.type'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { ConfigType } from '@dropgala/types/config.type'

import { AppState } from '../store'

export interface StoreConfigState extends ConfigType {
  theme: StoreThemes
}

const initialState: StoreConfigState = {
  theme: '@dropgala/luma'
}

export const storeConfig = createSlice({
  name: 'storeConfig',
  initialState,
  reducers: {
    setConfig: (
      state: StoreConfigState,
      action: PayloadAction<{ storeConfig: StoreConfigState }>
    ) => {
      const storeConfig = action.payload.storeConfig

      state = {
        ...storeConfig,
        theme: '@dropgala/luma'
      }

      return state
    }
  }
})

export const { setConfig } = storeConfig.actions

export const selectConfig = (state: AppState): StoreConfigState =>
  state.ConfigReducer

export default storeConfig.reducer
