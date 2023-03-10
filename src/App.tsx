import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {addNewTodoListAC, TodolistType} from "./redux/todoListReducer";
import {addNewTodoListAndTaskAC} from "./redux/tasksReducer";
import {
    AppBar,
    Button,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    Switch,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {amber, deepOrange} from "@mui/material/colors";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";

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
    const dispatch = useDispatch()

    const addNewTodoList = (title: string) => {
        let todoListId = v1()
        dispatch(addNewTodoListAC(todoListId, title))
        dispatch(addNewTodoListAndTaskAC(todoListId))
    }

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
                        News
                    </Typography>
                        <Switch onChange={(e) => {setDark(e.currentTarget.checked)}} color={'secondary'}/>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <CssBaseline/>
            <Container fixed sx={{
                p:10,
            }}>
                <Grid container spacing={5} direction={'column'} alignItems={'center'} justifyItems={'center'}>
                    <Grid item>
                        <div>
                            <AddItemForm getTitle={addNewTodoList} label={'Add Todo'}/>
                        </div>
                    </Grid>
                    <Grid item>
                        <Grid container >
                            {mapTodolist}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}


