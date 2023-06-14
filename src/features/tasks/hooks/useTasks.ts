import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { ChangeEvent, useCallback } from 'react';
import { TaskDomainType, TaskStatuses } from 'api/api';
import { taskThunk } from 'features/tasks/tasks.slice';
import s from 'features/todolist/components/TodoList/Todolist.module.css';

export const useTasks = (todoListId: string, task: TaskDomainType) => {
  const dispatch = useAppDispatch();

  const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked
      ? TaskStatuses.New
      : TaskStatuses.Completed;
    dispatch(taskThunk.updateTask({todoListId, taskId: task.id, domainModel: {status}}));
  };

  const removeTask = useCallback(
    () => dispatch(taskThunk.removeTask({ todoListId, taskId: task.id })),
    [dispatch, todoListId, task.id]
  );

  const changeTitle = useCallback(
    (title: string) =>
      dispatch(taskThunk.updateTask({ todoListId, taskId: task.id, domainModel: {title} })),
    [dispatch, todoListId, task.id]
  );

  const finalStyle = `${task.status ? `${s.taskWrapper} ${s.done}` : s.taskWrapper}`

  return {
    changeStatus, removeTask, changeTitle, finalStyle
  }
}