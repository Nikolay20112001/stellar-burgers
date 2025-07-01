import { getOrderByNumberApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IOrderByNumberState {
  orders: TOrder[];
  loading: boolean;
  err: string | undefined;
}

export const initialState: IOrderByNumberState = {
  orders: [],
  loading: false,
  err: undefined
};

export const fetchOrderByNumber = createAsyncThunk(
  'orderByNumber/fetchOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const orderByNumberSlice = createSlice({
  name: 'orderByNumber',
  initialState,
  reducers: {},
  selectors: {
    selectOrdersByNumber: (sliceState) => sliceState.orders,
    selectOrdersByNumberLoading: (sliceState) => sliceState.loading
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (sliceState) => {
        sliceState.loading = true;
      })
      .addCase(fetchOrderByNumber.rejected, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.err = action.error.message;
      })
      .addCase(fetchOrderByNumber.fulfilled, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.orders = action.payload.orders;
      });
  }
});

export const { selectOrdersByNumber, selectOrdersByNumberLoading } =
  orderByNumberSlice.selectors;

export default orderByNumberSlice.reducer;
