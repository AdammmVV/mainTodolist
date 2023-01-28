import {SuperButton} from "./SuperButton";
import {TaskTitle} from "./TaskTitle";
import {SuperInput} from "./SuperInput";
import React, {ChangeEvent} from "react";
import {FilterType, StateType} from "../App";


type TodolistPropsType = {
    state: StateType[]
    title: string
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
                        const onChangeInputCheckBox = (e:ChangeEvent<HTMLInputElement>) => {
                            setCheckbox(e.currentTarget.checked, t.id)
                        }
                        return (
                        <li key={t.id}>
                        <input type="checkbox" onChange={onChangeInputCheckBox} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <SuperButton onClick={() => removeTask(t.id)} name={'X'}/>
                        </li>)}
                    )}

                </ul>
            </div>
            <div>
                <SuperButton onClick={() => tasksFilter('all')} name={'All'}/>
                <SuperButton onClick={() => tasksFilter('active')} name={'Active'}/>
                <SuperButton onClick={() => tasksFilter('completed')} name={'Completed'}/>
            </div>
        </div>
    );
}