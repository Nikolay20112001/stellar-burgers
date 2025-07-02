import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  moveUpBurgerIngredient,
  moveDownIngredientBurger,
  removeBurgerIngredient
} from '../../services/slices/burger-constructor-slice';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveDownIngredientBurger(index));
    };

    const handleMoveUp = () => {
      dispatch(moveUpBurgerIngredient(index));
    };

    const handleClose = () => {
      dispatch(removeBurgerIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
