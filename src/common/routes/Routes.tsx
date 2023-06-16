import React from 'react';
import { createHashRouter } from 'react-router-dom';
import { TodolistList } from 'features/todolist/components/TodolistList';
import { Login } from 'features/auth/components/Login/Login';
import { Layout } from 'app/components/Layout';
import { paths } from 'common/constants/paths';
import { NotFound } from 'common/components/NotFound/NotFound';
import { RequireAuth } from 'common/routes/RequireAuth';
import { Auth } from './Auth';

export const router = createHashRouter([
  {
    path: paths.MAIN,
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: paths.MAIN,
            element: <TodolistList />
          }
        ]
      },
      {
        element: <Auth />,
        children: [
          {
            path: paths.LOGIN,
            element: <Login />
          }
        ]
      }
    ]
  }
]);
