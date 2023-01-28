import React from "react";

type SuperButtonPropsType = {
    onClick: () => void
    name: string
}
export const SuperButton: React.FC<SuperButtonPropsType> = ({onClick, name}) => {
    return (
        <button onClick={onClick}>{name}</button>
    )
}