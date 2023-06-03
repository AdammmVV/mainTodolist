import React from 'react';
import { IconButton } from '@mui/material';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

type IconButtonPropsType = {
  onClick: () => void;
  disabled: boolean
  color:
    | 'primary'
    | 'inherit'
    | 'default'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | undefined;
  size?: 'small' | 'medium' | 'large' | undefined;
};
export const IconMUIButton: React.FC<IconButtonPropsType> = React.memo(
  ({ onClick, color, size, disabled }) => {
    return (
      <IconButton onClick={onClick} color={color} size={size} disabled={disabled}>
        <DeleteForeverSharpIcon />
      </IconButton>
    );
  }
);
