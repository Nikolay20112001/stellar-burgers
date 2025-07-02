import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUserProfileName } from '../../services/slices/user-slice';

export const AppHeader: FC = () => {
  const userName = useSelector(selectUserProfileName);
  return <AppHeaderUI userName={userName} />;
};
