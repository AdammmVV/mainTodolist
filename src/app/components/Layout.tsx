import React, { useEffect } from 'react';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import Container from '@mui/material/Container/Container';
import { Outlet, useNavigate } from 'react-router-dom';
import { paths } from 'common/constants/paths';
import { LoaderApp } from 'common/components/Loaders/loaderApp/LoaderApp';
import { Header } from 'common/components/Header/Header';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { toast, ToastContainer } from 'react-toastify';
import { authThunk } from 'features/auth/auth.slice';
import { todoListThunk } from 'features/todolist/todoList.slice';


export const Layout = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isLoading = useAppSelector(state => state.app.isLoading)
  const isAppLoading = useAppSelector( state => state.app.isAppLoading)
  const error = useAppSelector(state => state.app.error)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(authThunk.getMe())
    if (!isAuth) {
      navigate(paths.LOGIN)
      return
    }
    dispatch(todoListThunk.getTodoList());
    navigate(paths.MAIN)
  }, [isAuth, dispatch, navigate]);

  if (error) {
    toast.success(error)
  }

  return (
    <>
      <Header />
      { isLoading && <LinearProgress />}
      <Container fixed sx={{ p: 10 }}>
        {isAppLoading ? <LoaderApp /> : <Outlet />}
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};
