import type { CategoryType } from '@dropgala/types/category.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { AppState } from '../store'

export interface MenuState {
  menu: CategoryType[]
  homePageCategories: CategoryType[]
}

const initialState: MenuState = {
  menu: [],
  homePageCategories: []
}

export const menu = createSlice({
  name: 'MenuReducer',
  initialState,
  reducers: {
    setMenu: (
      state: MenuState,
      action: PayloadAction<{ menu: CategoryType[] }>
    ) => {
      state.menu = action.payload.menu
    },
    setHomePageCategories: (
      state: MenuState,
      action: PayloadAction<{ categories: CategoryType[] }>
    ) => {
      state.homePageCategories = action.payload.categories
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.MenuReducer
      }
    }
  }
})

export const { setMenu, setHomePageCategories } = menu.actions

export const selectMenu = (state: AppState): MenuState => state.MenuReducer

export default menu.reducer
