import React, {ChangeEvent, KeyboardEvent} from "react";

type SuperInputPropsType = {
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
    onChange: (e: string) => void
    title: string

}
export const SuperInput: React.FC<SuperInputPropsType> = (
    {
        onKeyDown,
        onChange,
        title
    }) => {

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyDown(e)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value)
    }

    return (
        <input
            onKeyDown={onKeyDownHandler}
            onChange={onChangeHandler}
            value={title}
            type="text"/>
    )
}