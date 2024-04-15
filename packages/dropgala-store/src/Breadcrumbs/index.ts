import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { AppState } from '../store'
import { BreadcrumbType } from '@dropgala/types/category.type'

export interface BreadcrumbState {
  name: string | null
  breadcrumbs: BreadcrumbType[]
}

const initialState: BreadcrumbState = {
  name: null,
  breadcrumbs: []
}

export const Breadcrumbs = createSlice({
  name: 'BreadcrumbsReducer',
  initialState,
  reducers: {
    setBreadcrumb: (
      state: BreadcrumbState,
      action: PayloadAction<{
        name: string | null
        breadcrumbs: BreadcrumbType[]
      }>
    ) => {
      state.name = action.payload.name
      state.breadcrumbs = action.payload.breadcrumbs
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.BreadcrumbsReducer
      }
    }
  }
})

export const { setBreadcrumb } = Breadcrumbs.actions

export const selectBreadcrumbs = (state: AppState): BreadcrumbState =>
  state.BreadcrumbsReducer

export default Breadcrumbs.reducer
