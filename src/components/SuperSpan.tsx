import React, {useState} from "react";

type SuperSpanPropsType = {
    title: string
}
export const SuperSpan: React.FC<SuperSpanPropsType> =
    ({
         title,
     }) => {
        const [spanValue, setSpanValue] = useState<string>(title)

        return (
            <>
                <input type="text"/>
                <span>{spanValue}</span>
            </>
        )
    }