import React from "react";
import {Button} from "@mui/material";

type SuperButtonPropsType = {
    onClick: () => void
    name: string
    color?:  "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
    variant?: "text" | "outlined" | "contained" | undefined
}
export const SuperButton = React.memo(  (props: SuperButtonPropsType) => {
    return (
        <Button color={props.color}
                variant={props.variant}
                onClick={props.onClick}
        >{props.name}</Button>
    )
})