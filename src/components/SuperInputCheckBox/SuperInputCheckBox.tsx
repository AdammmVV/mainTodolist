import React, {ChangeEvent} from "react";

type SuperInputCheckBoxPropsType = {
    onChange: (e:boolean) => void
    checked: boolean
}
export const SuperInputCheckBox: React.FC<SuperInputCheckBoxPropsType> = (
    {
        onChange,
        checked,
    }
) => {
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.checked)
    }
    return (
        <input type="checkbox" onChange={onChangeHandler} checked={checked}/>
    )
}