import { MUIButton } from 'common/components/SuperButton/MUIButton';
import s from 'features/todolist/Todolist.module.css';
import React, { memo, useCallback, useEffect } from 'react';
import { FilterType } from 'app/App';
import { SuperSpan } from 'common/components/SuperSpan/SuperSpan';
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm';
import { Task } from 'features/todolist/Tasks/Task';
import { IconMUIButton } from 'common/components/SuperButton/IconMUIButton';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { Loader } from 'common/components/Loaders/loader/Loader';
import { taskThunk } from 'features/todolist/Tasks/tasks.slice';
import { todoListAction, todoListThunk } from 'features/todolist/todoList.slice';
import { TaskStatuses } from 'api/api';

type TodolistPropsType = {
  titleTodo: string;
  todoListId: string;
  entityStatus: boolean
  filter: FilterType;
};

export const Todolist: React.FC<TodolistPropsType> = memo(
  ({ titleTodo, todoListId, entityStatus, filter }) => {
    let tasks = useAppSelector((state) => state.tasks[todoListId]);
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (!isAuth) return
      dispatch(taskThunk.getTasks({ todoListId }));
    }, [dispatch, todoListId, isAuth]);

    if (filter === 'active') {
      tasks = tasks.filter((f) => f.status === TaskStatuses.New);
    }
    if (filter === 'completed') {
      tasks = tasks.filter((f) => f.status !== TaskStatuses.New);
    }

    const addTasks = useCallback(
      (title: string) => {
        dispatch(taskThunk.createTask({ todoListId, title }));
      },
      [dispatch, todoListId]
    );

    const removeTodoListHandler = useCallback(() => {
      dispatch(todoListThunk.removeTodoList({ todoListId }));
    }, [dispatch, todoListId]);

    const updateTodoList = useCallback(
      (title: string) => {
        dispatch(todoListThunk.updateTodolist({ todoListId, title }));
      },
      [dispatch, todoListId]
    );

    const taskFilterAll = useCallback(
      () => dispatch(todoListAction.setTasksFilter({ todoListId, filter: 'all' })),
      [dispatch, todoListId]
    );
    const taskFilterActive = useCallback(
      () => dispatch(todoListAction.setTasksFilter({ todoListId, filter:'active' })),
      [dispatch, todoListId]
    );
    const taskFilterCompleted = useCallback(
      () => dispatch(todoListAction.setTasksFilter({ todoListId, filter: 'completed'})),
      [dispatch, todoListId]
    );

    return (
      <>
        {entityStatus && <Loader />}
        <div className={s.todoListWrapper} style={entityStatus ? {pointerEvents: 'none', opacity: '0.5', cursor: 'wait'} : {}}>
        <h3>
          <SuperSpan title={titleTodo} callBack={updateTodoList} />
          <IconMUIButton
            disabled={entityStatus}
            onClick={removeTodoListHandler}
            color={'primary'}
            size={'medium'}
          />
        </h3>
        <AddItemForm getTitle={addTasks} label={'Add task'}  disabled={entityStatus}/>
        <ul className={s.tasksWrapper}>
          {tasks?.map(t => {
            return <Task key={t.id} task={t} todoListId={todoListId}/>;
          })}
        </ul>
        <div className={s.buttonWrapper}>
          <MUIButton
            color={filter === 'all' ? 'secondary' : undefined}
            variant={'contained'}
            onClick={taskFilterAll}
            name={'All'}
          />
          <MUIButton
            color={filter === 'active' ? 'secondary' : undefined}
            variant={'contained'}
            onClick={taskFilterActive}
            name={'Active'}
          />
          <MUIButton
            color={filter === 'completed' ? 'secondary' : undefined}
            variant={'contained'}
            onClick={taskFilterCompleted}
            name={'Completed'}
          />
        </div>
      </div>
    </>

    );
  }
);
