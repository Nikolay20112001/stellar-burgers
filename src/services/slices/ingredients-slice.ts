import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IIngredientsListState {
  ingredients: TIngredient[];
  loading: boolean;
  err: string | undefined;
}

export const initialState: IIngredientsListState = {
  ingredients: [],
  loading: false,
  err: undefined
};

export const fetchGetIngredients = createAsyncThunk(
  'ingredients/fetchGetIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (sliceState) => sliceState.ingredients,
    selectIngredientsLoading: (sliceState) => sliceState.loading
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetIngredients.pending, (sliceState) => {
        sliceState.loading = true;
      })
      .addCase(fetchGetIngredients.rejected, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.err = action.error.message;
      })
      .addCase(fetchGetIngredients.fulfilled, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.ingredients = action.payload;
      });
  }
});

export const { selectIngredients, selectIngredientsLoading } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
