import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./components/Todolist";

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TasksStateType = {
    [key: string]: TasksType[]
}

export type FilterType = 'all' | 'active' | 'completed'

export const App = () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoListId))
    }

    const inputCheckbox = (todoListId: string, taskId: string, isDone: boolean ) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone : isDone} : t)})
    }

    const addTask = (todoListId: string, title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]:[task, ...tasks[todoListId]]})
    }

    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }

    const tasksFilter = (todoListId: string, filter: FilterType) => {
        setTodoLists(todoLists.map(todo => todo.id === todoListId ? {...todo, filter: filter} : todo))
    }

    const changedTask = (todoListId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }

    const changedTodoListTitle = (todolistId: string, newTitle: string) => {
        setTodoLists(todoLists.map(t=> t.id === todolistId ? {...t, title: newTitle} : t))
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
            <Todolist
                key={todo.id}
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
        )
    })
    return (
        <div className={'App'}>
            {mapTodolist}
        </div>
    )
}


