import {MUIButton} from "./SuperButton/MUIButton";
import s from './Todolist.module.css'
import React, {memo, useCallback} from "react";
import {FilterType} from "../App";
import {SuperSpan} from "./SuperSpan";
import {AddItemForm} from "./AddItemForm";
import {addTaskAC, removeTasksAC, TasksType} from "../redux/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {changedTodoListTitleAC, removeTodoListAC, tasksFilterAC} from "../redux/todoListReducer";
import {Task} from "./Task";
import {IconMUIButton} from "./SuperButton/IconMUIButton";

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
    let tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[todoListId])
    const dispatch = useDispatch()

    if (filter === "active") {
        tasks = tasks.filter(f => !f.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(f => f.isDone)
    }

    const addTasks = useCallback((title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }, [dispatch, todoListId])

    const removeTodoListHandler = useCallback(() => {
        dispatch(removeTasksAC(todoListId))
        dispatch(removeTodoListAC(todoListId))
    }, [dispatch, todoListId])

    const getNewTitleTodoList = useCallback((newTitle: string) => {
        dispatch(changedTodoListTitleAC(todoListId, newTitle))
    }, [dispatch, todoListId])

    const taskFilterAll = useCallback(() => dispatch(tasksFilterAC(todoListId, 'all')), [dispatch, todoListId])
    const taskFilterActive = useCallback(() => dispatch(tasksFilterAC(todoListId, 'active')), [dispatch, todoListId])
    const taskFilterCompleted = useCallback(() => dispatch(tasksFilterAC(todoListId, 'completed')), [dispatch, todoListId])

    return (
        <div className={s.todoListWrapper}>
            <h3>
                <SuperSpan title={titleTodo} callBack={getNewTitleTodoList}/>
                <IconMUIButton onClick={removeTodoListHandler} color={'primary'} size={'medium'}/>
            </h3>
            <AddItemForm getTitle={addTasks} label={'Add task'}/>
            <ul className={s.tasksWrapper}>
                {tasks.map((t, i) => {
                    return <Task key={t.id}
                                 task={t}
                                 todoListId={todoListId}
                                 i={i}/>
                })}
            </ul>
            <div className={s.buttonWrapper}>
                <MUIButton color={filter === 'all' ? 'secondary' : undefined}
                           variant={'contained'}
                           onClick={taskFilterAll}
                           name={'All'}/>
                <MUIButton color={filter === 'active' ? 'secondary' : undefined}
                           variant={'contained'}
                           onClick={taskFilterActive}
                           name={'Active'}/>
                <MUIButton color={filter === 'completed' ? 'secondary' : undefined}
                           variant={'contained'}
                           onClick={taskFilterCompleted}
                           name={'Completed'}/>
            </div>
        </div>
    );
})

