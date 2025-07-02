import { useSelector } from '../../services/store';
import {
  selectUserProfileName,
  selectUserIsInitialized,
  selectUserIsRequestLoginApi
} from '../../services/slices/user-slice';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectUserIsInitialized);
  const user = useSelector(selectUserProfileName);
  const location = useLocation();
  const requestLoginApi = useSelector(selectUserIsRequestLoginApi);

  if (!isAuthChecked && requestLoginApi) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (!onAuth && !user) {
    // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate to='/login' state={{ from: location }} replace />; // в поле from объекта location.state записываем информацию о URL
  }

  if (onAuth && user) {
    // если пользователь на странице авторизации и данные есть в хранилище
    // при обратном редиректе получаем данные о месте назначения редиректа из объекта location.state
    // в случае если объекта location.state?.from нет — а такое может быть, если мы зашли на страницу логина по прямому URL
    // мы сами создаём объект c указанием адреса и делаем переадресацию на главную страницу
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate replace to={from} />;
  }

  return children;
};
