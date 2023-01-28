import React from "react";
import s from './SuperButton.module.css'

type SuperButtonPropsType = {
    onClick: () => void
    name: string
    background?: boolean
}
export const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        onClick,
        name,
        background
    }
) => {
    let finalClassName = background ? s.buttonStyle : '';

    return (
        <button className={finalClassName} onClick={onClick}>{name}</button>
    )
}