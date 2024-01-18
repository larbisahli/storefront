import {
  Action,
  AnyAction,
  configureStore,
  ThunkAction
} from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import BannerReducer from './Banner'
import CartReducer from './Cart'
import CheckoutReducer from './Checkout'
import ConfigReducer from './Config'
import DrawerReducer from './Drawer'
import MenuReducer from './Menu'
import { TypedUseSelectorHook } from '@dropgala/types'

const PRODUCTION_ENV = process.env.NODE_ENV === 'production'

export function createStore() {
  return configureStore({
    reducer: {
      CartReducer,
      CheckoutReducer,
      DrawerReducer,
      ConfigReducer,
      MenuReducer,
      BannerReducer
      // ProductListReducer,
      // ProductListInfoReducer,
      // WishlistReducer,
      // MyAccountReducer,
      // NavigationReducer,
      // OfflineReducer,
      // PopupReducer,
      // CheckoutReducer,
      // ContactFormReducer,
    },
    devTools: !PRODUCTION_ENV
  })
}

const store = createStore()

export const wrapper: ReturnType<typeof createWrapper> =
  createWrapper<AppStore>(createStore, { debug: false })

// **** Types ****
export type AppStore = ReturnType<typeof createStore>

export type AppState = ReturnType<AppStore['getState']>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export type AnyActionType = AnyAction

export type StoreProps = {
  useAppDispatch: () => AppDispatch
  useAppSelector: TypedUseSelectorHook<AppState>
}

export default store
