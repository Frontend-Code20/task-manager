import { useEffect, useState } from "react";

function InputField({ field, id, type, placeholder, name, value }) {

    // state to handle change in value
    const [inputValue, setInputValue] = useState(value);

    // Ensure the value updates if the parent changes the value prop
    useEffect(() => {
        if (value !== inputValue) {
            setInputValue(value);
        }
    }, [value])

    const handleOnChange = (e) => {
        setInputValue(e.target.value)
    }

    return (
        <div className="form-group mb-2">
            <label htmlFor={id} className="" aria-label={id} >{field}</label>
            <input type={type} id={id} className="form-control" value={inputValue} onChange={handleOnChange} placeholder={placeholder} name={name} required />
        </div>
    )
}

export default InputField;