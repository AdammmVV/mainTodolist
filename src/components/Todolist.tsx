import {SuperButton} from "./SuperButton/SuperButton";
import {TaskTitle} from "./TaskTitle";
import {SuperInput} from "./SuperInput/SuperInput";
import React from "react";
import {FilterType, StateType} from "../App";
import {SuperInputCheckBox} from "./SuperInputCheckBox/SuperInputCheckBox";


type TodolistPropsType = {
    state: StateType[]
    title: string
    filter: FilterType
    changeTitle: (value: string) => void
    addTask: () => void
    removeTask: (id: string) => void
    tasksFilter: (filter: FilterType) => void
    setCheckbox: (check: boolean, checkId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (
    {
        state,
        title,
        filter,
        changeTitle,
        addTask,
        removeTask,
        tasksFilter,
        setCheckbox,
    }
) => {


    return (
        <div>
            <TaskTitle name={'Hello todoList Main'}/>
            <div>
                <SuperInput onChange={changeTitle} title={title}/>
                <SuperButton onClick={addTask} name={'+'}/>
            </div>
            <div>
                <ul>
                    {state.map(t => {
                            const onChangeInputCheckBox = (e:boolean) => {
                                setCheckbox(e, t.id)
                            }
                            const removeTaskHandler = () => {
                                removeTask(t.id)
                            }
                            return (
                                <li key={t.id}>
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

