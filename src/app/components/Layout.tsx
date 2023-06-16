import React, { useEffect } from 'react';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import Container from '@mui/material/Container/Container';
import { Outlet } from 'react-router-dom';
import { LoaderApp } from 'common/components/Loaders/loaderApp/LoaderApp';
import { Header } from 'common/components/Header/Header';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { isAppLoadingSelector, isLoadingSelector } from 'app/app.selectors';
import { AppNotify } from 'common/components/AppNotify/AppNotify';
import { authThunks } from 'features/auth/auth.slice';

export const Layout = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const isAppLoading = useAppSelector(isAppLoadingSelector);

  useEffect(() => {
      dispatch(authThunks.getMe())
  }, [dispatch]);

  return (
    <>
      <Header />
      {isLoading && <LinearProgress />}
      <Container fixed sx={{ p: 10 }}>
        {isAppLoading ? <LoaderApp /> : <Outlet />}
      </Container>
      <AppNotify />
    </>
  );
};
