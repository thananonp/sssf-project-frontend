import {useState} from "react";

const useField = (type, predata) => {
    const [value, setValue] = useState(predata)

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }


    return {
        type,
        value,
        onChange,
        reset,
        setValue
    }
}

export {useField}