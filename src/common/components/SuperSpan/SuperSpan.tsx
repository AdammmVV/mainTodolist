import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react';
import { TextField } from '@mui/material';

type SuperSpanPropsType = {
  title: string;
  callBack: (newTitle: string) => void;
};
export const SuperSpan: React.FC<SuperSpanPropsType> = memo(
  ({ title, callBack }) => {
    const [spanValue, setSpanValue] = useState<string>(title);
    const [inputState, setInputState] = useState(false);

    const onDoubleClickSpanHandler = () => {
      setInputState(true);
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (spanValue.trim() !== '') {
        if (e.key === 'Enter') {
          setInputState(false);
          callBack(spanValue.trim());
        }
      }
    };

    const onBlurInputHandler = () => {
      if (spanValue.trim() !== '') {
        setInputState(false);
        callBack(spanValue.trim());
      }
    };

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setSpanValue(e.currentTarget.value);
    };

    return inputState ? (
      <TextField
        value={spanValue}
        onChange={onChangeInputHandler}
        onBlur={onBlurInputHandler}
        onKeyDown={onKeyDownHandler}
        autoFocus
        type="text"
        variant={'standard'}
        size={'small'}
      />
    ) : (
      <span onDoubleClick={onDoubleClickSpanHandler}>{spanValue}</span>
    );
  }
);
