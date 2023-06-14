import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useCallback, useEffect } from 'react';
import { taskThunk } from 'features/tasks/tasks.slice';
import { FilterType, TaskStatuses } from 'api/api';
import { todoListAction, todoListThunk } from 'features/todolist/todoList.slice';
import { useAppSelector } from 'common/hooks/useAppSelector';

export const useTodoList = (todoListId: string, filter: FilterType ) => {
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

  const removeTodoList = useCallback(() => {
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

  return {
    addTasks, removeTodoList, updateTodoList, taskFilterAll, taskFilterActive, taskFilterCompleted, tasks
  }
};