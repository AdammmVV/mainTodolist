import {SuperButton} from "./SuperButton/SuperButton";
import React from "react";
import {FilterType} from "../App";
import {SuperInputCheckBox} from "./SuperInputCheckBox/SuperInputCheckBox";
import {SuperSpan} from "./SuperSpan";
import {AddItemForm} from "./AddItemForm";
import {TasksType} from "../redux/tasksReducer";


type TodolistPropsType = {
    titleTodo: string
    todoListId: string
    tasks: TasksType[]
    filter: FilterType
    removeTodoList: (todoListId: string) => void
    addTask: (todoListId: string, title: string) => void
    removeTask: (todoListId: string, id: string) => void
    tasksFilter: (todoListId: string, filter: FilterType) => void
    setCheckbox: (todoListId: string, taskId: string, check: boolean) => void
    changedTask: (todoListId: string, taskId: string, newTitle: string) => void
    changedTodoListTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (
    {
        titleTodo,
        todoListId,
        tasks,
        filter,
        removeTodoList,
        addTask,
        removeTask,
        tasksFilter,
        setCheckbox,
        changedTask,
        changedTodoListTitle,
    }
) => {

    const getNetNewTaskTitle = (title: string) => {
        addTask(todoListId, title)
    }

    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }

    const getNewTitleTask = (id: string, newTitle: string) => {
        changedTask(todoListId, id, newTitle)
    }
    const getNewTitleTodoList = (newTitle: string) => {
        changedTodoListTitle(todoListId, newTitle)
    }

    return (
        <div>
            <h3>
                <SuperSpan title={titleTodo} callBack={getNewTitleTodoList}/>
                <SuperButton onClick={removeTodoListHandler} name={'X'}/>
            </h3>
            <div>
                <AddItemForm getTitle={getNetNewTaskTitle}/>
            </div>
            <div>
                <ul>
                    {tasks.map(t => {
                            const onChangeInputCheckBox = (isDone: boolean) => {
                                setCheckbox(todoListId, t.id, isDone)
                            }
                            const removeTaskHandler = () => removeTask(todoListId, t.id)
                            const getNewTitle = (newTitle: string) => getNewTitleTask(t.id, newTitle)
                            return (
                                <li key={t.id} className={t.isDone ? 'done' : ''}>
                                    <SuperInputCheckBox onChange={onChangeInputCheckBox} checked={t.isDone}/>
                                    <SuperSpan title={t.title} callBack={getNewTitle}/>
                                    <SuperButton onClick={removeTaskHandler} name={'X'}/>
                                </li>)
                        }
                    )}

                </ul>
            </div>
            <div>
                <SuperButton background={filter === 'all'}
                             onClick={() => tasksFilter(todoListId, 'all')}
                             name={'All'}/>
                <SuperButton background={filter === 'active'}
                             onClick={() => tasksFilter(todoListId, 'active')}
                             name={'Active'}/>
                <SuperButton background={filter === 'completed'}
                             onClick={() => tasksFilter(todoListId, 'completed')}
                             name={'Completed'}/>
            </div>
        </div>
    );
}