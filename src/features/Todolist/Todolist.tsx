import {MUIButton} from "common/components/SuperButton/MUIButton";
import s from 'features/Todolist/Todolist.module.css'
import React, {memo, useCallback, useEffect} from "react";
import {FilterType} from "app/App";
import {SuperSpan} from "common/components/SuperSpan/SuperSpan";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm";
import {createTaskAT, getTasksAT} from "features/Todolist/Tasks/tasksReducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "app/store";
import {removeTodoListAT, tasksFilterAC, updateTodolistAT} from "features/Todolist/todoListReducer";
import {Task} from "features/Todolist/Tasks/Task";
import {IconMUIButton} from "common/components/SuperButton/IconMUIButton";
import {TaskDomainType} from "api/api";

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
    let tasks = useSelector<AppRootStateType, TaskDomainType[]>(state => state.tasks[todoListId])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksAT(todoListId))
    }, [dispatch, todoListId])

    if (filter === "active") {
        tasks = tasks.filter(f => f.status === 0)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(f => f.status !== 0)
    }

    const addTasks = useCallback((title: string) => {
        dispatch(createTaskAT(todoListId, title))
    }, [dispatch, todoListId])

    const removeTodoListHandler = useCallback(() => {
        dispatch(removeTodoListAT(todoListId))
    }, [dispatch, todoListId])

    const updateTodoList = useCallback((newTitle: string) => {
        dispatch(updateTodolistAT(todoListId, newTitle))
    }, [dispatch, todoListId])

    const taskFilterAll = useCallback(() => dispatch(tasksFilterAC(todoListId, 'all')), [dispatch, todoListId])
    const taskFilterActive = useCallback(() => dispatch(tasksFilterAC(todoListId, 'active')), [dispatch, todoListId])
    const taskFilterCompleted = useCallback(() => dispatch(tasksFilterAC(todoListId, 'completed')), [dispatch, todoListId])

    return (
        <div className={s.todoListWrapper}>
            <h3>
                <SuperSpan title={titleTodo} callBack={updateTodoList}/>
                <IconMUIButton onClick={removeTodoListHandler} color={'primary'} size={'medium'}/>
            </h3>
            <AddItemForm getTitle={addTasks} label={'Add task'}/>
            <ul className={s.tasksWrapper}>
                {tasks?.map((t, i) => {
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

