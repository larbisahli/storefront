import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
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

export const { toggleCart, toggleMenu } = drawerSlice.actions

export default drawerSlice.reducer
