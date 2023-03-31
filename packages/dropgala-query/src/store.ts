import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { PRODUCTION_ENV } from '@utils/index';

import cartReducer from './card/index';
import drawerReducer from './drawer/index';

export function makeStore() {
  return configureStore({
    reducer: {
      cart: cartReducer,
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
