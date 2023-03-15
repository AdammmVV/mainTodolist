import {changedTaskAC, inputCheckboxAC, removeTaskAC, TasksType} from "../redux/tasksReducer";
import {useDispatch} from "react-redux";
import React, {ChangeEvent, memo, useCallback} from "react";
import s from "./Todolist.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {SuperSpan} from "./SuperSpan";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";

type TaskPropsType = {
    task: TasksType
    todoListId: string
    i: number
}
export const Task = memo((props: TaskPropsType) => {

    const dispatch = useDispatch()

    const onChangeInputCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(inputCheckboxAC(props.todoListId, props.task.id, e.currentTarget.checked))
    }

    const removeTaskHandler = () => dispatch(removeTaskAC(props.todoListId, props.task.id))

    const getNewTitle = useCallback((newTitle: string) =>
        dispatch(changedTaskAC(props.todoListId, props.task.id, newTitle)), [dispatch, props.todoListId, props.task.id])

    return (
        <li className={`${props.task.isDone ? `${s.taskWrapper} ${s.done}` : s.taskWrapper} ${props.i % 2 === 0 ? s.backgroundTask : ''}`}>
            <div>
                <Checkbox onChange={onChangeInputCheckBox} checked={props.task.isDone}/>
                <SuperSpan title={props.task.title} callBack={getNewTitle}/>
            </div>
            <IconButton onClick={removeTaskHandler} color={"primary"}>
                <DeleteForeverSharpIcon/>
            </IconButton>
        </li>)
})