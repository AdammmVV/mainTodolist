import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {createTodoListAT, getTodoListAT, TodolistType} from "./redux/todoListReducer";
import {Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider} from "@mui/material";
import {amber, deepOrange} from "@mui/material/colors";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./redux/store";
import {Header} from "./components/Header/Header";

export type FilterType = 'all' | 'active' | 'completed'

export const App = () => {

    const [dark, setDark] = useState(false)

    const darkTheme = createTheme({
        palette: {
            primary: amber,
            secondary: deepOrange,
            mode: 'dark',
        }
    })

    const waitTheme = createTheme()

    const todoLists = useSelector<AppRootStateType, TodolistType[]>(state => state.todoLists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodoListAT())
    }, [])

    const addNewTodoList = useCallback((title: string) => {
        dispatch(createTodoListAT(title))
    }, [dispatch])

    const mapTodolist = todoLists.map(todo => {
        return (
            <Grid item key={todo.id}>
                <Paper elevation={3}
                       sx={{
                           margin: 3,
                           maxWidth: 500,
                           paddingBottom: 3,
                           paddingTop: 0,
                       }}>
                    <Todolist
                        todoListId={todo.id}
                        titleTodo={todo.title}
                        filter={todo.filter}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <ThemeProvider theme={dark ? darkTheme : waitTheme}>
            <Header setDark={setDark}/>
            <Container fixed sx={{p: 10}}>
                <CssBaseline/>
                <Grid container spacing={5} direction={'column'} alignItems={'center'} justifyItems={'center'}>
                    <AddItemForm getTitle={addNewTodoList} label={'Add Todo'}/>
                    <Grid item>
                        <Grid container justifyItems={'center'}>
                            {mapTodolist}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

