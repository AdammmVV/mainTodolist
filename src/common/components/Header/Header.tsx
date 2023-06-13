import React, { memo } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';
import { useAppTheme } from 'app/hooks/useAppTheme';
import { useAuth } from 'features/auth/hooks/useAuth';

export const Header = memo(() => {
  const { theme, onChangeTheme } = useAppTheme();
  const { isAuth, onLogout } = useAuth()

  return (
    <AppBar position='static' color={'primary'}>
      <Toolbar variant={'dense'}>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          TodoList
        </Typography>
        <ThemeSwitch onChange={onChangeTheme} checked={theme} />
        {isAuth && <Button color='inherit' onClick={onLogout}>
          Logout
        </Button>}
      </Toolbar>
    </AppBar>
  );
});
