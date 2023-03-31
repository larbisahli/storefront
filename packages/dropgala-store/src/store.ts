import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import drawerReducer from './Drawer/index';

const PRODUCTION_ENV = process.env.NODE_ENV === 'production';

export function makeStore() {
  return configureStore({
    reducer: {
    //   cart: cartReducer,
      drawer: drawerReducer
    },
    devTools: !PRODUCTION_ENV
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
