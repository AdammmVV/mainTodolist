import React, {ChangeEvent, memo} from "react";
import {AppBar, Button, IconButton, Switch, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type HeaderPropsType = {
    setDark: (checked: boolean) => void
}
export const Header: React.FC<HeaderPropsType> = memo(({setDark}) => {
    console.log('header')
    const switchOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setDark(e.currentTarget.checked)

    return (
        <AppBar position="static" color={'primary'}>
            <Toolbar variant={'dense'}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    TodoList
                </Typography>
                <Switch onChange={switchOnChangeHandler} color={'secondary'}/>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
})