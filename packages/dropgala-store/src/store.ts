import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import BannerReducer from './Banner'
import CartReducer from './Cart'
import ConfigReducer from './Config'
import DrawerReducer from './Drawer'
import MenuReducer from './Menu'
import { TypedUseSelectorHook } from '@dropgala/types'

const PRODUCTION_ENV = process.env.NODE_ENV === 'production'

export function makeStore() {
  return configureStore({
    reducer: {
      CartReducer,
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

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type StoreProps = {
  useAppDispatch: () => AppDispatch
  useAppSelector: TypedUseSelectorHook<AppState>
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
