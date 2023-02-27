import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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

        const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (spanValue.trim() !== '') {
                if (e.key === 'Enter') {
                    setInputState(false)
                    callBack(spanValue.trim())
                }
            }
        }

        const onBlurInputHandler = () => {
            if (spanValue.trim() !== '') {
                setInputState(false)
                callBack(spanValue.trim())
            }
        }

        const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setSpanValue(e.currentTarget.value)
        }

        return (
            inputState
                ? <input value={spanValue}
                         onChange={onChangeInputHandler}
                         onBlur={onBlurInputHandler}
                         onKeyDown={onKeyDownHandler}
                         autoFocus
                         type="text"/>
                : <span onDoubleClick={onDoubleClickSpanHandler}>{spanValue}</span>
        )
    }