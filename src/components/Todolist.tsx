import {SuperButton} from "./SuperButton/SuperButton";
import {SuperInput} from "./SuperInput/SuperInput";
import React, {KeyboardEvent, useState} from "react";
import {FilterType, TasksType} from "../App";
import {SuperInputCheckBox} from "./SuperInputCheckBox/SuperInputCheckBox";


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
    }
) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (e: string) => {
        setTitle(e)
        setError(false)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickButtonHandler()
        }
    }

    const onClickButtonHandler = () => {
        if (title.trim() === '') {
            setError(true)
            setTitle('')
        } else {
            addTask(todoListId, title.trim())
            setTitle('')
        }
    }

    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }

    return (
        <div>
            <h3>
                {titleTodo}
                <SuperButton onClick={removeTodoListHandler} name={'X'}/>
            </h3>
            <div>
                <SuperInput onChange={changeTitle} onKeyDown={onKeyPressHandler} title={title}/>
                <SuperButton onClick={onClickButtonHandler} name={'+'}/>
                {error && <div style={{color: 'red'}}>Input cannot be empty!</div>}
            </div>
            <div>
                <ul>
                    {tasks.map(t => {
                            const onChangeInputCheckBox = (isDone: boolean) => {
                                setCheckbox(todoListId, t.id, isDone)
                            }
                            const removeTaskHandler = () => removeTask(todoListId, t.id)
                            return (
                                <li key={t.id} className={t.isDone ? 'done' : ''}>
                                    <SuperInputCheckBox onChange={onChangeInputCheckBox} checked={t.isDone}/>
                                    <span>{t.title}</span>
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

