import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  fetchGetUserOrders,
  selectApiOrdersRequest,
  selectOrdersUserHistory
} from '../../services/slices/orders-slice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const requestUserOrders = useSelector(selectApiOrdersRequest);
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrdersUserHistory);
  useEffect(() => {
    dispatch(fetchGetUserOrders());
  }, []);

  if (requestUserOrders) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
