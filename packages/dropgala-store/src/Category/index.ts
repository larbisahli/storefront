import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { AppState } from '../store'
import { CategoryType } from '@dropgala/types/category.type'

const initialState: CategoryType = {} as CategoryType

export const Category = createSlice({
  name: 'CategoryReducer',
  initialState,
  reducers: {
    setCategory: (
      state: CategoryType,
      action: PayloadAction<{ category: CategoryType }>
    ) => {
      state = action.payload.category
      return state
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.CategoryReducer
      }
    }
  }
})

export const { setCategory } = Category.actions

export const selectCategory = (state: AppState): CategoryType =>
  state.CategoryReducer

export default Category.reducer
