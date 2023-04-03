import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DrawerState {
  showCart: boolean
  menu: boolean
  open: boolean
}

const initialState: DrawerState = {
  showCart: false,
  menu: false,
  open: false
}

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    slideCart: (state: DrawerState, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
    openMenu: (state: DrawerState, action: PayloadAction<boolean>) => {
      state.menu = action.payload
    },
    toggleCartView: (state: DrawerState, action: PayloadAction<boolean>) => {
      state.showCart = action.payload
    }
  }
})

export const { slideCart, openMenu, toggleCartView } = drawerSlice.actions

export default drawerSlice.reducer
