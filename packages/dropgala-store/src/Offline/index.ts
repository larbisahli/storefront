import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '../store'

export interface OfflineState {
  isOffline: boolean
}

const initialState: OfflineState = {
  isOffline: false
}

export const Offline = createSlice({
  name: 'OfflineReducer',
  initialState,
  reducers: {
    setOffline: (state: OfflineState) => {
      state.isOffline = true
    },
    setOnline: (state: OfflineState) => {
      state.isOffline = false
    }
  }
})

export const { setOffline, setOnline } = Offline.actions

export const selectOffline = (state: AppState): OfflineState =>
  state.OfflineReducer

export default Offline.reducer
