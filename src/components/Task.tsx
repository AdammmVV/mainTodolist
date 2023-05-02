import {removeTaskAT, updateTaskAT} from "../redux/tasksReducer";
import React, {ChangeEvent, memo, useCallback} from "react";
import s from "./Todolist.module.css";
import {Checkbox} from "@mui/material";
import {SuperSpan} from "./SuperSpan";
import {IconMUIButton} from "./SuperButton/IconMUIButton";
import {TaskDomainType, TaskStatuses} from "../api/api";
import {useAppDispatch} from "../redux/store";

type TaskPropsType = {
    task: TaskDomainType
    todoListId: string
    i: number
}
export const Task = memo((props: TaskPropsType) => {
    const dispatch = useAppDispatch()

    const changeStatusCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.New : TaskStatuses.Completed
        dispatch(updateTaskAT(props.todoListId, props.task.id, {status}))
    }

    const removeTaskHandler = useCallback(() =>
        dispatch(removeTaskAT(props.todoListId, props.task.id)), [dispatch, props.todoListId, props.task.id])

    const changeTitle = useCallback((title: string) =>
        dispatch(updateTaskAT(props.todoListId, props.task.id, {title})), [dispatch, props.todoListId, props.task.id])

    return (
        <li className={`${props.task.status ? `${s.taskWrapper} ${s.done}` : s.taskWrapper} ${props.i % 2 === 0 ? s.backgroundTask : ''}`}>
            <div>
                <Checkbox onChange={changeStatusCheckbox} checked={props.task.status === 0}/>
                <SuperSpan title={props.task.title} callBack={changeTitle}/>
            </div>
            <IconMUIButton onClick={removeTaskHandler} color={"primary"}/>
        </li>)
})