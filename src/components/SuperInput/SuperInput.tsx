import React, {ChangeEvent} from "react";

type SuperInputPropsType = {
    onChange: (e: string) => void
    title: string

}
export const SuperInput: React.FC<SuperInputPropsType> = ({onChange, title}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value)
    }

    return (
        <input
            onChange={onChangeHandler}
            value={title}
            type="text"/>
    )
}