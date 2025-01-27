import { useState } from "react";

// Checkbox component
export function CheckBox({ isChecked, taskId, addNewTaskToList, removeTaskFromList }) {

    const [checked, setChecked] = useState(isChecked);

    // Handle change value
    const handleClick = (e) => {
        setChecked(e.target.checked)
        if(e.target.checked){
            addNewTaskToList(taskId);   
        }else{
            removeTaskFromList(taskId);
        }
    }

    return (
        <>
            <input type="checkbox" id={"listItem"} className="form-check-input cr-pointer" checked={checked} onChange={handleClick} />
        </>
    )
}

export default CheckBox;