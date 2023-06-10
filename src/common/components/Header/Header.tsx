import React, { ChangeEvent, memo } from 'react';
import { AppBar, Button, IconButton, Switch, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { authThunk } from 'features/auth/auth.slice';
import { appActions } from 'app/app.slice';

export const Header = memo(() => {
  const dispatch = useAppDispatch();

  const onChangeTheme = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch( appActions.setTheme({ theme: e.currentTarget.checked }));

  const onClickHandler = () => {
    dispatch(authThunk.logout());
  };
  return (
    <AppBar position="static" color={'primary'}>
      <Toolbar variant={'dense'}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TodoList
        </Typography>
        <Switch onChange={onChangeTheme} color={'secondary'} />
        <Button color="inherit" onClick={onClickHandler}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
});
