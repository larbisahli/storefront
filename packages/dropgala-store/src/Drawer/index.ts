import { createSlice } from '@reduxjs/toolkit'

import { AppState } from '../store'

export interface DrawerState {
  isCart: boolean
  isMenu: boolean
  isOpen: boolean
}

const initialState: DrawerState = {
  isCart: false,
  isMenu: false,
  isOpen: false
}

export const drawer = createSlice({
  name: 'DrawerReducer',
  initialState,
  reducers: {
    toggleCart: (state: DrawerState) => {
      state.isCart = true
      state.isMenu = false
      state.isOpen = !state.isOpen
    },
    toggleMenu: (state: DrawerState) => {
      state.isMenu = true
      state.isCart = false
      state.isOpen = !state.isOpen
    }
  }
})

export const { toggleCart, toggleMenu } = drawer.actions

export const selectDrawer = (state: AppState): DrawerState =>
  state.DrawerReducer

export default drawer.reducer
