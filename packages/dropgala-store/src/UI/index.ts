import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { AppState } from '../store'
import { uniq } from '@dropgala/utils/lodashFunctions'

export type fontsType =
  | '--font-lato'
  | '--font-roboto'
  | '--font-arimo'
  | '--font-jost'
  | '--font-signika'

export interface UIState {
  fontFamilies: fontsType[]
}

const initialState: UIState = {
  fontFamilies: ['--font-lato']
}

export const UI = createSlice({
  name: 'UIReducer',
  initialState,
  reducers: {
    addFontFamily: (
      state: UIState,
      action: PayloadAction<{ fontFamily: fontsType }>
    ) => {
      const fonts = [...state.fontFamilies, action.payload.fontFamily]
      return { fontFamilies: uniq(fonts) }
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.UIReducer
      }
    }
  }
})

export const { addFontFamily } = UI.actions

export const selectUI = (state: AppState): UIState => state.UIReducer

export default UI.reducer
