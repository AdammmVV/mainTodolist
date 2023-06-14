import { useAppSelector } from 'common/hooks/useAppSelector';
import { themeSelector } from 'app/app.selectors';
import { createTheme } from '@mui/material';
import { amber, deepOrange } from '@mui/material/colors';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { ChangeEvent } from 'react';
import { appActions } from 'app/app.slice';

export const useAppTheme = () => {
  const theme = useAppSelector(themeSelector);
  const dispatch = useAppDispatch();

  const darkTheme = createTheme({
    palette: {
      primary: amber,
      secondary: deepOrange,
      mode: 'dark'
    }
  });
  const waitTheme = createTheme();

  const onChangeTheme = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(appActions.setTheme({ theme: e.currentTarget.checked }));

  return {theme, darkTheme, waitTheme, onChangeTheme};
};