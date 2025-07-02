import { TIngredient, TConstructorIngredient } from '@utils-types';
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

interface IBurgerState {
  construcorItems: {
    ingredients: TConstructorIngredient[];
    bun: TConstructorIngredient | null;
  };
}

export const initialState: IBurgerState = {
  construcorItems: {
    ingredients: [],
    bun: null
  }
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    moveUpBurgerIngredient: (sliceState, action: PayloadAction<number>) => {
      const selectIngredient =
        sliceState.construcorItems.ingredients[action.payload];
      const swapIngredient =
        sliceState.construcorItems.ingredients[action.payload - 1];

      sliceState.construcorItems.ingredients.splice(
        action.payload - 1,
        2,
        selectIngredient,
        swapIngredient
      );
    },

    moveDownIngredientBurger: (sliceState, action: PayloadAction<number>) => {
      const selectIngredient =
        sliceState.construcorItems.ingredients[action.payload];
      const swapIngredient =
        sliceState.construcorItems.ingredients[action.payload + 1];

      sliceState.construcorItems.ingredients.splice(
        action.payload,
        2,
        swapIngredient,
        selectIngredient
      );
    },

    addBurgerIngredients: {
      reducer: (sliceState, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type == 'bun') {
          sliceState.construcorItems.bun = action.payload;
        } else if (action.payload.type == 'main') {
          sliceState.construcorItems.ingredients.push(action.payload);
        } else if (action.payload.type == 'sauce') {
          sliceState.construcorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },

    removeBurgerIngredient: (
      sliceState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      sliceState.construcorItems.ingredients =
        sliceState.construcorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
    },

    clearBurgerConstructor: (sliceState) => {
      sliceState.construcorItems = { bun: null, ingredients: [] };
    }
  },

  selectors: {
    selectBurgerState: (sliceState) => sliceState
  }
});

export const { selectBurgerState } = burgerConstructorSlice.selectors;

export const {
  moveUpBurgerIngredient,
  moveDownIngredientBurger,
  addBurgerIngredients,
  removeBurgerIngredient,
  clearBurgerConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
