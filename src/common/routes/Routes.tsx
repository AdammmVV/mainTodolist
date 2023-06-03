import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { TodolistList } from 'features/todolist/TodolistList';
import { Login } from 'features/auth/Login/Login';
import { Layout } from 'app/components/Layout';
import { paths } from 'common/constants/paths';

export const router = createBrowserRouter([
  {
    path: paths.MAIN,
    element: <Layout />,
    errorElement: <div><Navigate to={'404'}/> ERROR </div>,
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
