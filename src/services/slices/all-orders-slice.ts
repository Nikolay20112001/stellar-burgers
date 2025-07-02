import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IAllOrdersState {
  feeds: TOrder[];
  loading: boolean;
  err: string | undefined;
  totalOrders: number;
  totalOrdersToday: number;
}

export const initialState: IAllOrdersState = {
  feeds: [],
  loading: false,
  err: undefined,
  totalOrders: 0,
  totalOrdersToday: 0
};

export const fetchAllOrders = createAsyncThunk(
  'allOrders/fetchAllOrders',
  async () => getFeedsApi()
);

const allOrdersSlice = createSlice({
  name: 'allOrders',
  initialState,
  reducers: {},
  selectors: {
    selectAllOrders: (sliceState) => sliceState.feeds,
    selectAllOrdersLoading: (sliceState) => sliceState.loading,
    selectAllOrdersTotalOrders: (sliceState) => sliceState.totalOrders,
    selectAllOrdersTotalOrdersToday: (sliceState) => sliceState.totalOrdersToday
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (sliceState) => {
        sliceState.loading = true;
      })
      .addCase(fetchAllOrders.rejected, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.err = action.error.message;
      })
      .addCase(fetchAllOrders.fulfilled, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.feeds = action.payload.orders;
        sliceState.totalOrders = action.payload.total;
        sliceState.totalOrdersToday = action.payload.totalToday;
      });
  }
});

export const {
  selectAllOrders,
  selectAllOrdersLoading,
  selectAllOrdersTotalOrders,
  selectAllOrdersTotalOrdersToday
} = allOrdersSlice.selectors;

export default allOrdersSlice.reducer;
