import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';

type AddItemFormPropsType = {
  getTitle: (title: string) => void;
  label: string;
};
export const AddItemForm: React.FC<AddItemFormPropsType> = memo((props) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(false);

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setError(false);
  };

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClickButtonHandler();
    }
  };

  const onClickButtonHandler = () => {
    if (title.trim() === '') {
      setError(true);
      setTitle('');
    } else {
      props.getTitle(title.trim());
      setTitle('');
    }
  };

  return (
    <Grid item>
      <TextField
        value={title}
        onChange={changeTitle}
        onKeyDown={onKeyPressHandler}
        label={props.label}
        title={title}
        type={'text'}
        size={'small'}
        color={'primary'}
        error={error}
        helperText={error ? 'Input cannot be empty!' : ''}
      />
      <IconButton onClick={onClickButtonHandler} color={'primary'}>
        <AddBoxSharpIcon />
      </IconButton>
    </Grid>
  );
});
