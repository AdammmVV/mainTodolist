import React from "react";

type TaskTitlePropsType = {
    name: string
}
export const TaskTitle: React.FC<TaskTitlePropsType> = ({name}) => {
    return (
        <h3>{name}</h3>
    )
}