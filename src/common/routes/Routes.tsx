import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { TodolistList } from 'features/todolist/components/TodolistList';
import { Login } from 'features/auth/components/Login/Login';
import { Layout } from 'app/components/Layout';
import { paths } from 'common/constants/paths';
import { NotFound } from 'common/components/NotFound/NotFound';

export const router = createBrowserRouter([
  {
    path: paths.MAIN,
    element: <Layout />,
    errorElement: <NotFound/>,
    children: [
      {
        path: paths.MAIN,
        element: <TodolistList />,
      },
      {
        path: paths.LOGIN,
        element: <Login />,
      },
    ],
  },
]);
