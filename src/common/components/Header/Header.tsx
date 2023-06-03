import React, { ChangeEvent, memo } from 'react';
import {
  AppBar,
  Button,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { logoutTC } from 'features/auth/authReducer';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { setDarkThemeAC } from 'app/appReducer';

export const Header = memo(() => {
  const dispatch = useAppDispatch();

  const switchOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch( setDarkThemeAC(e.currentTarget.checked));

  const onClickHandler = () => {
    dispatch(logoutTC());
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
        <Switch onChange={switchOnChangeHandler} color={'secondary'} />
        <Button color="inherit" onClick={onClickHandler}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
});
