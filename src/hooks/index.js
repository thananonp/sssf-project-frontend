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

const useNotification = (timeout) => {
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)

    const alertSuccess = () => {
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, timeout ? timeout : 2500)
    }
    const alertFailure = () => {
        setFailure(true)
        setTimeout(() => {
            setFailure(false)
        }, timeout ? timeout : 2500)
    }

    return {success, failure, alertSuccess, alertFailure}
}

export {useField, useNotification}