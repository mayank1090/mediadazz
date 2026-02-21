import { configureStore } from '@reduxjs/toolkit';
import authApi from './authApi';
import campaignApi from './campaignApi';
import categoryApi from './categoryApi';
import productApi from './productApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [campaignApi.reducerPath]: campaignApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, campaignApi.middleware, categoryApi.middleware, productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
