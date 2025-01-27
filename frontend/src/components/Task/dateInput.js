import { useEffect, useState } from "react";

// Date input component
function DateInput({label, id, name , value = ''}) {

    // state to handle value on change
    const [dateValue, setDateValue] = useState(value.split('T')[0]);
    
    // Ensure the value updates if the parent changes the value prop
    useEffect(() => {
        
        if(value !== dateValue){
            const newDate = value.split('T')[0];
            setDateValue(newDate);
        }

    }, [value]);

    const handleOnChange = (e) => {
        setDateValue(e.target.value)
    }

    return (
        <div>
            <label htmlFor={id} >{label}</label>
            <input type="date" className="form-control" value={dateValue} onChange={handleOnChange} id={id} name={name} required/>
        </div>
    )
}

export default DateInput;