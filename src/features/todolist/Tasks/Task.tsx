import {
  removeTaskAT,
  updateTaskAT,
} from 'features/todolist/Tasks/tasksReducer';
import React, { ChangeEvent, memo, useCallback } from 'react';
import s from 'features/todolist/Todolist.module.css';
import { Checkbox } from '@mui/material';
import { SuperSpan } from 'common/components/SuperSpan/SuperSpan';
import { IconMUIButton } from 'common/components/SuperButton/IconMUIButton';
import { TaskDomainType, TaskStatuses } from 'api/api';
import { useAppDispatch } from 'common/hooks/useAppDispatch';

type TaskPropsType = {
  task: TaskDomainType;
  todoListId: string;
};
export const Task = memo((props: TaskPropsType) => {
  const dispatch = useAppDispatch();

  const changeStatusCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked
      ? TaskStatuses.New
      : TaskStatuses.Completed;
    dispatch(updateTaskAT(props.todoListId, props.task.id, { status }));
  };

  const removeTaskHandler = useCallback(
    () => dispatch(removeTaskAT(props.todoListId, props.task.id)),
    [dispatch, props.todoListId, props.task.id]
  );

  const changeTitle = useCallback(
    (title: string) =>
      dispatch(updateTaskAT(props.todoListId, props.task.id, { title })),
    [dispatch, props.todoListId, props.task.id]
  );

  const finalStyle = `${props.task.status ? `${s.taskWrapper} ${s.done}` : s.taskWrapper}`

  return (
    <li className={finalStyle}>
      <div>
        <Checkbox
          onChange={changeStatusCheckbox}
          checked={props.task.status === 0}
        />
        <SuperSpan title={props.task.title} callBack={changeTitle} />
      </div>
      <IconMUIButton onClick={removeTaskHandler} color={'primary'}/>
    </li>
  );
});
