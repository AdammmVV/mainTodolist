import React, { useEffect } from 'react';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { getMeTC } from "features/auth/authReducer";
import { getTodoListAT } from 'features/todolist/todoListReducer';
import Container from '@mui/material/Container/Container';
import { Outlet, useNavigate } from "react-router-dom";
import { paths } from "common/constants/paths";
import { Loader } from 'common/components/Loader/Loader';
import { Header } from 'common/components/Header/Header';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';


export const Layout = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isLoading = useAppSelector(state => state.app.isLoading)
  const isAppLoading = useAppSelector( state => state.app.isAppLoading)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getMeTC())
    if (!isAuth) {
      navigate(paths.LOGIN)
      return
    }
    dispatch(getTodoListAT());
    navigate(paths.MAIN)
  }, [isAuth, dispatch, navigate]);


  return (
    <>
      <Header />
      { isLoading && <LinearProgress />}
      <Container fixed sx={{ p: 10 }}>
        {isAppLoading ? <Loader /> : <Outlet />}
      </Container>
    </>
  );
};
