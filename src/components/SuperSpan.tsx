import React, {ChangeEvent, useState} from "react";

type SuperSpanPropsType = {
    title: string
    callBack: (newTitle: string) => void
}
export const SuperSpan: React.FC<SuperSpanPropsType> =
    ({
         title,
        callBack,
     }) => {
        const [spanValue, setSpanValue] = useState<string>(title)
        const [inputState, setInputState] = useState(false)

        const onDoubleClickSpanHandler = () => {
            setInputState(true)
        }

        const onBlurInputHandler = () => {
            setInputState(false)
            callBack(spanValue)
        }

        const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
            setSpanValue(e.currentTarget.value)
        }

        return (
            inputState
                ? <input value={spanValue}
                         onChange={onChangeInputHandler}
                         onBlur={onBlurInputHandler}
                         autoFocus
                         type="text"/>
                : <span onDoubleClick={onDoubleClickSpanHandler}>{spanValue}</span>
        )
    }