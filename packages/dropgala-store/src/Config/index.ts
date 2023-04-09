import { StoreThemes } from '@dropgala/types/enums.type'
import { createSlice } from '@reduxjs/toolkit'

import { AppState } from '../store'

export interface StoreConfigState {
  theme: StoreThemes
}

const initialState: StoreConfigState = {
  theme: '@dropgala/luma'
}

export const storeConfig = createSlice({
  name: 'storeConfig',
  initialState,
  reducers: {}
})

export const selectConfig = (state: AppState): StoreConfigState =>
  state.ConfigReducer

export default storeConfig.reducer
