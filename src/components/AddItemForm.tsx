import React, {KeyboardEvent, useState} from "react";
import {SuperInput} from "./SuperInput/SuperInput";
import {SuperButton} from "./SuperButton/SuperButton";

type AddItemFormPropsType = {
    getTitle: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (e: string) => {
        setTitle(e)
        setError(false)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickButtonHandler()
        }
    }

    const onClickButtonHandler = () => {
        if (title.trim() === '') {
            setError(true)
            setTitle('')
        } else {
            props.getTitle(title.trim())
            setTitle('')
        }
    }

    return (
        <>
            <SuperInput onChange={changeTitle} onKeyDown={onKeyPressHandler} title={title}/>
            <SuperButton onClick={onClickButtonHandler} name={'+'}/>
            {error && <div style={{color: 'red'}}>Input cannot be empty!</div>}
        </>
    )
}