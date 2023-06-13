import React, { memo } from 'react';
import { Checkbox } from '@mui/material';
import { SuperSpan } from 'common/components/SuperSpan/SuperSpan';
import { IconMUIButton } from 'common/components/SuperButton/IconMUIButton';
import { TaskDomainType, TaskStatuses } from 'api/api';
import { useTasks } from 'features/tasks/hooks/useTasks';

type TaskPropsType = {
  task: TaskDomainType;
  todoListId: string;
};
export const Task: React.FC<TaskPropsType> = memo(({todoListId, task}) => {
 const { finalStyle, removeTask, changeTitle, changeStatus} = useTasks(todoListId, task)

  return (
    <li className={finalStyle}>
      <div>
        <Checkbox
          onChange={changeStatus}
          checked={task.status === TaskStatuses.New}
        />
        <SuperSpan title={task.title} callBack={changeTitle} />
      </div>
      <IconMUIButton onClick={removeTask} color={'primary'}/>
    </li>
  );
});
