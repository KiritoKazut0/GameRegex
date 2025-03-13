import { useState } from "react";
import * as validateField from "../utils/validations/Field"


const useField = ({type}) => {
    const [value, setValue] = useState('');
    const [messageError, setMessageError] = useState('');

    const onBlur = (event) => {
        setValue(event.target.value);
        setMessageError(validateField[type](event.target.value).message);
    }

    const onChange = (event) => {
        setValue(event.target.value);
    }

    return {
        type,
        value,
        messageError,
        onBlur,
        onChange
    }

}

export default useField;