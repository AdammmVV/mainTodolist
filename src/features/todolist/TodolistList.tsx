import { createTodoListAT } from 'features/todolist/todoListReducer';
import React, { useCallback } from 'react';
import { CssBaseline, Grid, Paper } from '@mui/material';
import { Todolist } from 'features/todolist/Todolist';
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';

export const TodolistList = () => {
  const todoLists = useAppSelector((state) => state.todoLists);
  const dispatch = useAppDispatch();

  const addNewTodoList = useCallback(
    (title: string) => {
      dispatch(createTodoListAT(title));
    },
    [dispatch]
  );

  const mapTodolist = todoLists.map((todo) => {
    return (
      <Grid item key={todo.id}>
        <Paper
          elevation={3}
          sx={{
            margin: 3,
            maxWidth: 500,
            paddingBottom: 3,
            paddingTop: 0,
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
        <AddItemForm getTitle={addNewTodoList} label={'Add Todo'} />
        <Grid item>
          <Grid container justifyItems={'center'}>
            {mapTodolist}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
