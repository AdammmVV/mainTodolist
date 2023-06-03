import React from 'react';
import 'app/App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { amber, deepOrange } from '@mui/material/colors';
import { RouterProvider } from 'react-router-dom';
import { router } from 'common/routes/Routes';
import { useAppSelector } from 'common/hooks/useAppSelector';

export type FilterType = 'all' | 'active' | 'completed';

export const App = () => {
  const theme = useAppSelector(state => state.app.theme);

  const darkTheme = createTheme({
    palette: {
      primary: amber,
      secondary: deepOrange,
      mode: 'dark'
    }
  });
  const waitTheme = createTheme();

  return (
    <ThemeProvider theme={theme ? darkTheme : waitTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
