import {SuperButton} from "./SuperButton/SuperButton";
import s from './Todolist.module.css'
import React, {memo, useCallback} from "react";
import {FilterType} from "../App";
import {SuperSpan} from "./SuperSpan";
import {AddItemForm} from "./AddItemForm";
import {addTaskAC, removeTasksAC, TasksStateType, TasksType} from "../redux/tasksReducer";
import {IconButton} from '@mui/material';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {changedTodoListTitleAC, removeTodoListAC, tasksFilterAC} from "../redux/todoListReducer";
import {Task} from "./Task";

type TodolistPropsType = {
    titleTodo: string
    todoListId: string
    filter: FilterType
}

export const Todolist: React.FC<TodolistPropsType> = memo((
    {
        titleTodo,
        todoListId,
        filter,
    }
) => {

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTasks = useCallback((title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }, [dispatch, todoListId])

    const removeTodoListHandler = () => {
        dispatch(removeTasksAC(todoListId))
        dispatch(removeTodoListAC(todoListId))
    }

    const getNewTitleTodoList = useCallback((newTitle: string) => {
        dispatch(changedTodoListTitleAC(todoListId, newTitle))
    }, [dispatch, todoListId])

    const changeStatusTasks = (todoListId: string, filter: FilterType): TasksType[] => {

        if (filter === "active") {
            return tasks[todoListId].filter(f => !f.isDone)
        }
        if (filter === 'completed') {
            return tasks[todoListId].filter(f => f.isDone)
        }
        return tasks[todoListId]
    }

    const taskFilterAll = useCallback(() => dispatch(tasksFilterAC(todoListId, 'all')), [dispatch, todoListId])
    const taskFilterActive = useCallback(() => dispatch(tasksFilterAC(todoListId, 'active')), [dispatch, todoListId])
    const taskFilterCompleted = useCallback(() => dispatch(tasksFilterAC(todoListId, 'completed')), [dispatch, todoListId])

    return (
        <div className={s.todoListWrapper}>
            <h3>
                <SuperSpan title={titleTodo} callBack={getNewTitleTodoList}/>
                <IconButton onClick={removeTodoListHandler} color={'primary'} size={'medium'}>
                    <HighlightOffSharpIcon/>
                </IconButton>
            </h3>
            <AddItemForm getTitle={addTasks} label={'Add task'}/>
            <ul className={s.tasksWrapper}>
                {changeStatusTasks(todoListId, filter).map((t, i) => <Task
                    key={t.id}
                    task={t}
                    todoListId={todoListId}
                    i={i}/>)}
            </ul>
            <div className={s.buttonWrapper}>
                <SuperButton color={filter === 'all' ? 'secondary' : undefined}
                             variant={'contained'}
                             onClick={taskFilterAll}
                             name={'All'}/>
                <SuperButton color={filter === 'active' ? 'secondary' : undefined}
                             variant={'contained'}
                             onClick={taskFilterActive}
                             name={'Active'}/>
                <SuperButton color={filter === 'completed' ? 'secondary' : undefined}
                             variant={'contained'}
                             onClick={taskFilterCompleted}
                             name={'Completed'}/>
            </div>
        </div>
    );
})

