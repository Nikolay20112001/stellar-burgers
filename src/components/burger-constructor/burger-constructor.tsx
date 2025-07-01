import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearBurgerConstructor,
  selectBurgerState
} from '../../services/slices/burger-constructor-slice';
import { useNavigate } from 'react-router-dom';
import {
  clearUserOrder,
  fetchUserOrder,
  selectOrderRequest,
  selectUserOrder
} from '../../services/slices/orders-slice';
import { selectUserIsInitialized } from '../../services/slices/user-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectBurgerState).construcorItems;
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const userInit = useSelector(selectUserIsInitialized);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectUserOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!userInit) {
      navigateTo('/login');
      return;
    }

    const order: string[] = [
      constructorItems.bun!._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun!._id
    ];

    dispatch(fetchUserOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(clearUserOrder());
    dispatch(clearBurgerConstructor());
    navigateTo('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
