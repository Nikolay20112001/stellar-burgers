import { getOrdersApi, orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IOrdersState {
  ordersUserHistory: TOrder[];
  userOrder: TOrder | null;
  apiRequest: boolean;
  orderRequest: boolean;
  err: string | undefined;
}

export const initialState: IOrdersState = {
  ordersUserHistory: [],
  userOrder: null,
  apiRequest: false,
  orderRequest: false,
  err: undefined
};

export const fetchUserOrder = createAsyncThunk(
  'ordersUser/fetchUserOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const fetchGetUserOrders = createAsyncThunk(
  'ordersUser/fetchGetUserOrders',
  async () => getOrdersApi()
);

const ordersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    clearUserOrder: (sliceState) => {
      sliceState.userOrder = null;
    }
  },
  selectors: {
    selectOrdersUserHistory: (sliceState) => sliceState.ordersUserHistory,
    selectUserOrder: (sliceState) => sliceState.userOrder,
    selectOrderRequest: (sliceState) => sliceState.orderRequest,
    selectApiOrdersRequest: (sliceState) => sliceState.apiRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrder.pending, (sliceState) => {
        sliceState.orderRequest = true;
      })
      .addCase(fetchUserOrder.rejected, (sliceState, action) => {
        sliceState.orderRequest = false;
        sliceState.err = action.error.message;
      })
      .addCase(fetchUserOrder.fulfilled, (sliceState, action) => {
        sliceState.orderRequest = false;
        sliceState.userOrder = action.payload.order;
      })

      .addCase(fetchGetUserOrders.pending, (sliceState) => {
        sliceState.apiRequest = true;
      })
      .addCase(fetchGetUserOrders.rejected, (sliceState, action) => {
        sliceState.apiRequest = false;
        sliceState.err = action.error.message;
      })
      .addCase(fetchGetUserOrders.fulfilled, (sliceState, action) => {
        sliceState.apiRequest = false;
        sliceState.ordersUserHistory = action.payload;
      });
  }
});

export const {
  selectOrdersUserHistory,
  selectUserOrder,
  selectOrderRequest,
  selectApiOrdersRequest
} = ordersSlice.selectors;

export const { clearUserOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
