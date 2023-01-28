import {SuperButton} from "./SuperButton/SuperButton";
import {TaskTitle} from "./TaskTitle";
import {SuperInput} from "./SuperInput/SuperInput";
import React, {KeyboardEvent, useState} from "react";
import {FilterType, StateType} from "../App";
import {SuperInputCheckBox} from "./SuperInputCheckBox/SuperInputCheckBox";


type TodolistPropsType = {
    state: StateType[]
    filter: FilterType
    addTask: (title: string) => void
    removeTask: (id: string) => void
    tasksFilter: (filter: FilterType) => void
    setCheckbox: (check: boolean, checkId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (
    {
        state,
        filter,
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
            addTask(title.trim())
            setTitle('')
        }

    }

    return (
        <div>
            <TaskTitle name={'Hello todoList Main'}/>
            <div>
                <SuperInput onChange={changeTitle} onKeyDown={onKeyPressHandler} title={title}/>
                <SuperButton onClick={onClickButtonHandler} name={'+'}/>
                {error && <div style={{color: 'red'}}>Input cannot be empty!</div>}
            </div>
            <div>
                <ul>
                    {state.map(t => {
                            const onChangeInputCheckBox = (e: boolean) => {
                                setCheckbox(e, t.id)
                            }
                            const removeTaskHandler = () => {
                                removeTask(t.id)
                            }
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
                             onClick={() => tasksFilter('all')}
                             name={'All'}/>
                <SuperButton background={filter === 'active'}
                             onClick={() => tasksFilter('active')}
                             name={'Active'}/>
                <SuperButton background={filter === 'completed'}
                             onClick={() => tasksFilter('completed')}
                             name={'Completed'}/>
            </div>
        </div>
    );
}

