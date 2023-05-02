import React, {useEffect, useState} from 'react';
import 'app/App.css';
import {getTodoListAT} from "features/Todolist/todoListReducer";
import {createTheme, ThemeProvider} from "@mui/material";
import {amber, deepOrange} from "@mui/material/colors";
import {useAppDispatch} from "app/store";
import {Header} from "common/components/Header/Header";
import {TodolistList} from "features/Todolist/TodolistList";
import Container from '@mui/material/Container/Container';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Login} from "common/components/Login/Login";

export type FilterType = 'all' | 'active' | 'completed'

export const App = () => {

    useEffect(() => {
        dispatch(getTodoListAT())
    }, [])
    const [dark, setDark] = useState(false)
    const dispatch = useAppDispatch()

    const darkTheme = createTheme({
        palette: {
            primary: amber,
            secondary: deepOrange,
            mode: 'dark',
        }
    })
    const waitTheme = createTheme()

    return (
        <ThemeProvider theme={dark ? darkTheme : waitTheme}>
            <BrowserRouter>
                <Header setDark={setDark}/>
                <Container fixed sx={{p: 10}}>
                    <Routes>
                        <Route path={'/'} element={<TodolistList/>}/>
                        <Route path={'login'} element={<Login/>}/>
                        <Route path={'*'} element={<Navigate to={'404'}/>}/>
                        <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    </Routes>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    )
}

