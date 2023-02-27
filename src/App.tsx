import React, {useReducer} from 'react';
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
    removeTaskAC, removeTasksAC,
    tasksReducer
} from "./redux/tasksReducer";

export type FilterType = 'all' | 'active' | 'completed'

export const App = () => {

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

    const inputCheckbox = (todoListId: string, taskId: string, isDone: boolean ) => {
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
            <div>
                <AddItemForm getTitle={addNewTodoList}/>
            </div>
            {mapTodolist}
        </div>
    )
}


