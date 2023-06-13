import { MUIButton } from 'common/components/SuperButton/MUIButton';
import s from 'features/todolist/components/TodoList/Todolist.module.css';
import React, { memo } from 'react';
import { FilterType } from 'api/api';
import { SuperSpan } from 'common/components/SuperSpan/SuperSpan';
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm';
import { Task } from 'features/tasks/components/Task';
import { IconMUIButton } from 'common/components/SuperButton/IconMUIButton';
import { Loader } from 'common/components/Loaders/loader/Loader';
import { useTodoList } from 'features/todolist/hooks/useTodoList';

type TodolistPropsType = {
  titleTodo: string;
  todoListId: string;
  entityStatus: boolean
  filter: FilterType;
};

export const Todolist: React.FC<TodolistPropsType> = memo(
  ({ titleTodo, todoListId, entityStatus, filter }) => {
    const {
      tasks,
      addTasks,
      taskFilterActive,
      taskFilterAll,
      taskFilterCompleted,
      removeTodoList,
      updateTodoList
    } = useTodoList(todoListId, filter);

    return (
      <>
        {entityStatus && <Loader />}
        <div className={s.todoListWrapper}
             style={entityStatus ? { pointerEvents: 'none', opacity: '0.5', cursor: 'wait' } : {}}>
          <h3>
            <SuperSpan title={titleTodo} callBack={updateTodoList} />
            <IconMUIButton
              disabled={entityStatus}
              onClick={removeTodoList}
              color={'primary'}
              size={'medium'}
            />
          </h3>
          <AddItemForm getTitle={addTasks} label={'Add task'} disabled={entityStatus} />
          <ul className={s.tasksWrapper}>
            {tasks?.map(t => {
              return <Task key={t.id} task={t} todoListId={todoListId} />;
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
