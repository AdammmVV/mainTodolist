import {SuperButton} from "./SuperButton/SuperButton";
import s from './Todolist.module.css'
import React, {ChangeEvent} from "react";
import {FilterType} from "../App";
import {SuperSpan} from "./SuperSpan";
import {AddItemForm} from "./AddItemForm";
import {
    addTaskAC,
    changedTaskAC,
    inputCheckboxAC,
    removeTaskAC,
    removeTasksAC,
    TasksStateType,
    TasksType
} from "../redux/tasksReducer";
import {Checkbox, IconButton} from '@mui/material';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {changedTodoListTitleAC, removeTodoListAC, tasksFilterAC} from "../redux/todoListReducer";

type TodolistPropsType = {
    titleTodo: string
    todoListId: string
    filter: FilterType
}

export const Todolist: React.FC<TodolistPropsType> = (
    {
        titleTodo,
        todoListId,
        filter,
    }
) => {

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTasks = (title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }

    const removeTodoListHandler = () => {
        dispatch(removeTasksAC(todoListId))
        dispatch(removeTodoListAC(todoListId))
    }

    const getNewTitleTask = (taskId: string, newTitle: string) => {
        dispatch(changedTaskAC(todoListId, taskId, newTitle))
    }

    const getNewTitleTodoList = (newTitle: string) => {
        dispatch(changedTodoListTitleAC(todoListId, newTitle))
    }

    const changeStatusTasks = (todoListId: string, filter: FilterType): TasksType[] => {

        if (filter === "active") {
            return tasks[todoListId].filter(f => !f.isDone)
        }
        if (filter === 'completed') {
            return tasks[todoListId].filter(f => f.isDone)
        }
        return tasks[todoListId]
    }

    return (
        <div className={s.todoListWrapper}>
            <h3>
                <SuperSpan title={titleTodo} callBack={getNewTitleTodoList}/>
                <IconButton onClick={removeTodoListHandler} color={'primary'} size={'medium'}>
                    <HighlightOffSharpIcon/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm getTitle={addTasks} label={'Add task'}/>
            </div>
            <div>
                <ul className={s.tasksWrapper}>
                    {changeStatusTasks(todoListId, filter).map((t, i) => {
                            const onChangeInputCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
                                dispatch(inputCheckboxAC(todoListId, t.id, e.currentTarget.checked))
                            }
                            const removeTaskHandler = () => dispatch(removeTaskAC(todoListId, t.id))
                            const getNewTitle = (newTitle: string) => getNewTitleTask(t.id, newTitle)
                            return (
                                <li key={t.id}
                                    className={`${t.isDone ? `${s.taskWrapper} ${s.done}` : s.taskWrapper} ${i % 2 === 0 ? s.backgroundTask : ''}`}>
                                    <div>
                                        <Checkbox onChange={onChangeInputCheckBox} checked={t.isDone}/>
                                        <SuperSpan title={t.title} callBack={getNewTitle}/>
                                    </div>
                                    <IconButton onClick={removeTaskHandler} color={"primary"}>
                                        <DeleteForeverSharpIcon/>
                                    </IconButton>
                                </li>)
                        }
                    )}
                </ul>
            </div>
            <div className={s.buttonWrapper}>
                <SuperButton color={filter === 'all' ? 'secondary' : undefined}
                             variant={'contained'}
                             onClick={() => dispatch(tasksFilterAC(todoListId, 'all'))}
                             name={'All'}/>
                <SuperButton color={filter === 'active' ? 'secondary' : undefined}
                             variant={'contained'}
                             onClick={() => dispatch(tasksFilterAC(todoListId, 'active'))}
                             name={'Active'}/>
                <SuperButton color={filter === 'completed' ? 'secondary' : undefined}
                             variant={'contained'}
                             onClick={() => dispatch(tasksFilterAC(todoListId, 'completed'))}
                             name={'Completed'}/>
            </div>
        </div>
    );
}