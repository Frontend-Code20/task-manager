import { useEffect, useState } from "react";

// Dropdown component 
function Dropdown({ btnText, items, id, name, value }) {

    // state to handle value change
    const [selectedValue, setSelectedValue] = useState(value === null ? 'Select an Option' : value);
    // Map over the select items 
    const dropdownItems = items.map((value, idx) => {
        return (
            <option className="dropdown-item" key={btnText + idx} value={value}>{value}</option>
        )
    })
    
    // Ensure the value updates if the parent changes the value prop
    useEffect(() => {
        if (value != selectedValue && value) {
            setSelectedValue(value)
        }
    }, [value]);

    const handleOnChange = (e) => {
        setSelectedValue(e.target.value)
    }

    return (
        <>
            <label htmlFor={id} >{btnText}</label>
            <select className="form-select" id={id} name={name} value={selectedValue} onChange={handleOnChange} required>
                <option value="Select an Option" disabled  >Select an Option</option>
                {dropdownItems}
            </select>
        </>
    )
}

export default Dropdown;