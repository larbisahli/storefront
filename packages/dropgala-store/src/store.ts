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
import CategoryReducer from './Category'
import BreadcrumbsReducer from './Breadcrumbs'
import OfflineReducer from './Offline'
import ProductReducer from './Product'
import CollectionsReducer from './Collections'
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
      BannerReducer,
      CategoryReducer,
      BreadcrumbsReducer,
      OfflineReducer,
      ProductReducer,
      CollectionsReducer
      // WishlistReducer,
      // MyAccountReducer,
      // NavigationReducer,
      // PopupReducer,
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
  moduleName: string
  componentId: string
  componentName: string
  fields: any
}

export default store
