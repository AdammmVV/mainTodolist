import React from 'react';
import 'app/components/AppStyles/App.css';
import { ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from 'common/routes/Routes';
import { useAppTheme } from 'app/hooks/useAppTheme';

export const App = () => {
  const {theme, darkTheme, waitTheme} = useAppTheme()

  return (
    <ThemeProvider theme={theme ? darkTheme : waitTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

//types


