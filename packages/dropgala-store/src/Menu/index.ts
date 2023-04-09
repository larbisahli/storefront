import { CategoryType } from '@dropgala/types/category.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppState } from '../store'

export interface MenuState {
  menu: CategoryType[]
}

const initialState: MenuState = {
  menu: []
}

export const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu: (
      state: MenuState,
      action: PayloadAction<{ menu: CategoryType[] }>
    ) => {
      state.menu = action.payload.menu
    }
  }
})

export const { setMenu } = menu.actions

export const selectMenu = (state: AppState): MenuState => state.MenuReducer

export default menu.reducer
