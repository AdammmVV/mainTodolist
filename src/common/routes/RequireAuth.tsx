import { useAuth } from 'features/auth/hooks/useAuth';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { paths } from 'common/constants/paths';

export const RequireAuth = () => {
  const { isAuth } = useAuth()
  return isAuth ? <Outlet/> : <Navigate to={paths.LOGIN}/>
}