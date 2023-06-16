import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { authThunks } from 'features/auth/auth.slice';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { isAuthSelector } from 'features/auth/auth.selectors';
import { paths } from 'common/constants/paths';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(isAuthSelector);

  const onLogout = () =>
    dispatch(authThunks.logout()).unwrap().then(() => navigate(paths.LOGIN));

  const onLogin = (data: { email: string, password: string, rememberMe: boolean }) =>
    dispatch(authThunks.logIn(data)).unwrap().then(() => navigate(paths.MAIN));

  return { isAuth, onLogout, onLogin };
};