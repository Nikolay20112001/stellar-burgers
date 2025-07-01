import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './slices/user-slice';
import ordersSliceReducer from './slices/orders-slice';
import orderByNumberReducer from './slices/order-by-number-slice';
import allOrdersReducer from './slices/all-orders-slice';
import burgerConstructorReducer from './slices/burger-constructor-slice';
import burgerIngredientsReducer from './slices/ingredients-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  user: userSliceReducer,
  userOrders: ordersSliceReducer,
  ingredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  allOrders: allOrdersReducer,
  orderByNumber: orderByNumberReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
