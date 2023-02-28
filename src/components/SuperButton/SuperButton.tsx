import React from "react";
import {Button} from "@mui/material";

type SuperButtonPropsType = {
    onClick: () => void
    name: string
    color?:  "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
    variant?: "text" | "outlined" | "contained" | undefined
}
export const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        onClick,
        name,
        color,
        variant,
   }
) => {
    return (
        <Button color={color}
                variant={variant}
                onClick={onClick}
        >{name}</Button>
    )
}