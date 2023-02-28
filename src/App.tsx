import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {
    addNewTodoListAC,
    changedTodoListTitleAC,
    removeTodoListAC,
    tasksFilterAC,
    todoListReducer
} from "./redux/todoListReducer";
import {
    addNewTodoListAndTaskAC,
    addTaskAC,
    changedTaskAC,
    inputCheckboxAC,
    removeTaskAC,
    removeTasksAC,
    tasksReducer
} from "./redux/tasksReducer";
import {
    AppBar, Button,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Typography,
    Toolbar, Switch
} from "@mui/material";
import {amber, deepOrange} from "@mui/material/colors";
import MenuIcon from '@mui/icons-material/Menu';


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

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, dispatchTodo] = useReducer(todoListReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "React-Redux", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Butter", isDone: false},

        ]
    });

    const removeTodoList = (todoListId: string) => {
        dispatchTasks(removeTasksAC(todoListId))
        dispatchTodo(removeTodoListAC(todoListId))
    }

    const addNewTodoList = (title: string) => {
        let todoListId = v1()
        dispatchTodo(addNewTodoListAC(todoListId, title))
        dispatchTasks(addNewTodoListAndTaskAC(todoListId))
    }

    const inputCheckbox = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(inputCheckboxAC(todoListId, taskId, isDone))
    }

    const addTask = (todoListId: string, title: string) => {
        dispatchTasks(addTaskAC(todoListId, title))
    }

    const removeTask = (todoListId: string, taskId: string) => {
        dispatchTasks(removeTaskAC(todoListId, taskId))
    }

    const tasksFilter = (todoListId: string, filter: FilterType) => {
        dispatchTodo(tasksFilterAC(todoListId, filter))
    }

    const changedTask = (todoListId: string, taskId: string, newTitle: string) => {
        dispatchTasks(changedTaskAC(todoListId, taskId, newTitle))
    }

    const changedTodoListTitle = (todolistId: string, newTitle: string) => {
        dispatchTodo(changedTodoListTitleAC(todolistId, newTitle))
    }

    const changeStatusTasks = (todoListId: string, filter: FilterType) => {

        if (filter === "active") {
            return tasks[todoListId].filter(f => !f.isDone)
        }
        if (filter === 'completed') {
            return tasks[todoListId].filter(f => f.isDone)
        }
        return tasks[todoListId]
    }

    const mapTodolist = todoLists.map(todo => {
        let filterTasks = changeStatusTasks(todo.id, todo.filter)
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
                        tasks={filterTasks}
                        filter={todo.filter}
                        removeTodoList={removeTodoList}
                        addTask={addTask}
                        removeTask={removeTask}
                        tasksFilter={tasksFilter}
                        setCheckbox={inputCheckbox}
                        changedTask={changedTask}
                        changedTodoListTitle={changedTodoListTitle}
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


