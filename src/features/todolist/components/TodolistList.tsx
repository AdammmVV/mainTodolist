import React, { useCallback, useEffect } from 'react';
import { CssBaseline, Grid, Paper } from '@mui/material';
import { Todolist } from 'features/todolist/components/TodoList/Todolist';
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { todoListThunk } from 'features/todolist/todoList.slice';
import { todoListSelector } from 'features/todolist/todoList.selectors';
import { isLoadingSelector } from 'app/app.selectors';

export const TodolistList = () => {
  const todoLists = useAppSelector(todoListSelector);
  const isLoading = useAppSelector( isLoadingSelector)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todoListThunk.getTodoList())
  }, [dispatch])

  const createTodoList = useCallback(
    (title: string) => {
      dispatch(todoListThunk.createTodoList({ title }));
    },
    [dispatch]
  );

  const mapTodolist = todoLists.map((todo) => {
    return (
      <Grid item key={todo.id} >
        <Paper
          elevation={3}
          sx={{
            margin: 3,
            maxWidth: 500,
            paddingBottom: 3,
            paddingTop: 0,
            position: 'relative'
          }}
        >
          <Todolist
            todoListId={todo.id}
            titleTodo={todo.title}
            entityStatus={todo.entityStatus}
            filter={todo.filter}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={5}
        direction={'column'}
        alignItems={'center'}
        justifyItems={'center'}
      >
        <AddItemForm getTitle={createTodoList} label={'Add Todo'} disabled={isLoading} />
        <Grid item>
          <Grid container justifyItems={'center'}>
            {mapTodolist}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
