import React, { ChangeEvent, memo, useCallback } from 'react';
import s from 'features/todolist/Todolist.module.css';
import { Checkbox } from '@mui/material';
import { SuperSpan } from 'common/components/SuperSpan/SuperSpan';
import { IconMUIButton } from 'common/components/SuperButton/IconMUIButton';
import { TaskDomainType, TaskStatuses } from 'api/api';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { taskThunk } from 'features/todolist/Tasks/tasks.slice';

type TaskPropsType = {
  task: TaskDomainType;
  todoListId: string;
};
export const Task: React.FC<TaskPropsType> = memo(({todoListId, task}) => {
  const dispatch = useAppDispatch();

  const changeStatusCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked
      ? TaskStatuses.New
      : TaskStatuses.Completed;
    dispatch(taskThunk.updateTask({todoListId, taskId: task.id, domainModel: {status}}));
  };

  const removeTaskHandler = useCallback(
    () => dispatch(taskThunk.removeTask({ todoListId, taskId: task.id })),
    [dispatch, todoListId, task.id]
  );

  const changeTitle = useCallback(
    (title: string) =>
      dispatch(taskThunk.updateTask({ todoListId, taskId: task.id, domainModel: {title} })),
    [dispatch, todoListId, task.id]
  );

  const finalStyle = `${task.status ? `${s.taskWrapper} ${s.done}` : s.taskWrapper}`

  return (
    <li className={finalStyle}>
      <div>
        <Checkbox
          onChange={changeStatusCheckbox}
          checked={task.status === TaskStatuses.New}
        />
        <SuperSpan title={task.title} callBack={changeTitle} />
      </div>
      <IconMUIButton onClick={removeTaskHandler} color={'primary'}/>
    </li>
  );
});
