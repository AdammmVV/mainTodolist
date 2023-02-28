import {SuperButton} from "./SuperButton/SuperButton";
import s from './Todolist.module.css'
import React, {ChangeEvent} from "react";
import {FilterType} from "../App";
import {SuperInputCheckBox} from "./SuperInputCheckBox/SuperInputCheckBox";
import {SuperSpan} from "./SuperSpan";
import {AddItemForm} from "./AddItemForm";
import {TasksType} from "../redux/tasksReducer";
import {Checkbox, IconButton} from '@mui/material';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';

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
    changedTask: (todoListId: string, taskId: string, newTitle: string) => void
    changedTodoListTitle: (todolistId: string, newTitle: string) => void
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
        changedTask,
        changedTodoListTitle,
    }
) => {

    const getNetNewTaskTitle = (title: string) => {
        addTask(todoListId, title)
    }

    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }

    const getNewTitleTask = (id: string, newTitle: string) => {
        changedTask(todoListId, id, newTitle)
    }
    const getNewTitleTodoList = (newTitle: string) => {
        changedTodoListTitle(todoListId, newTitle)
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
                <AddItemForm getTitle={getNetNewTaskTitle} label={'Add task'}/>
            </div>
            <div>
                <ul className={s.tasksWrapper}>
                    {tasks.map((t, i) => {
                            const onChangeInputCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
                                setCheckbox(todoListId, t.id, e.currentTarget.checked)
                            }
                            const removeTaskHandler = () => removeTask(todoListId, t.id)
                            const getNewTitle = (newTitle: string) => getNewTitleTask(t.id, newTitle)
                            return (
                                <li key={t.id}
                                    className={`${t.isDone ? `${s.taskWrapper} ${s.done}` : s.taskWrapper} ${i%2 === 0 ? s.backgroundTask : ''}`}>
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
                             onClick={() => tasksFilter(todoListId, 'all')}
                             name={'All'}/>
                <SuperButton color={filter === 'active' ? 'secondary' : undefined}
                             variant={'contained'}
                             onClick={() => tasksFilter(todoListId, 'active')}
                             name={'Active'}/>
                <SuperButton color={filter === 'completed' ? 'secondary' : undefined}
                             variant={'contained'}
                             onClick={() => tasksFilter(todoListId, 'completed')}
                             name={'Completed'}/>
            </div>
        </div>
    );
}