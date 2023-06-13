import React, { useEffect } from 'react';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import Container from '@mui/material/Container/Container';
import { Outlet, useNavigate } from 'react-router-dom';
import { paths } from 'common/constants/paths';
import { LoaderApp } from 'common/components/Loaders/loaderApp/LoaderApp';
import { Header } from 'common/components/Header/Header';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { todoListThunk } from 'features/todolist/todoList.slice';
import { isAppLoadingSelector, isLoadingSelector } from 'app/app.selectors';
import { useAuth } from 'features/auth/hooks/useAuth';
import { AppNotify } from 'common/components/AppNotify/AppNotify';

export const Layout = () => {
  const { isAuth, onAuth } = useAuth()
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector)
  const isAppLoading = useAppSelector( isAppLoadingSelector)

  useEffect(() => {
    if (!isAuth) {
      onAuth()
      return
    }
    navigate(paths.MAIN)
    dispatch(todoListThunk.getTodoList());
  }, [isAuth, dispatch, navigate]);

  return (
    <>
      <Header />
      { isLoading && <LinearProgress />}
      <Container fixed sx={{ p: 10 }}>
        {isAppLoading ? <LoaderApp /> : <Outlet />}
      </Container>
      <AppNotify/>
    </>
  );
};
