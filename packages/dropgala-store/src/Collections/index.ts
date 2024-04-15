import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { AppState } from '../store'
import { ProductType } from '@dropgala/types/product.type'

type CollectionState = {
  [key: string]: ProductType[]
}
const initialState: CollectionState = {} as CollectionState

export const Collections = createSlice({
  name: 'CollectionsReducer',
  initialState,
  reducers: {
    setCollection: (
      state: CollectionState,
      action: PayloadAction<{
        collection: { id: string; items: ProductType[] }
      }>
    ) => {
      const collection = action.payload.collection
      state[collection.id] = collection.items
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.CollectionsReducer
      }
    }
  }
})

export const { setCollection } = Collections.actions

export const selectCollections = (state: AppState): CollectionState =>
  state.CollectionsReducer
export const selectCollection = (state: AppState, key: string): ProductType[] =>
  state.CollectionsReducer[key]

export default Collections.reducer
