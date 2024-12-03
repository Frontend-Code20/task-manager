import InputField from "./inputfield";
import Dropdown from "./dropdown";
import DateInput from "./dateInput";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { BarContext } from "./globalState";

function CreateTask() {

    const navigate = useNavigate();
    const { setContent } = useContext(BarContext);

    return (
        <div className="m-2 h-100 custom-bg-primary rounded-2 overflow-auto" style={{ boxSizing: "border-box" }}>
            <div className="d-flex align-items-center ps-2">
                <img src="./assets/icons/back.png" className="mt-2" style={{cursor: "pointer"}} width={"24px"} height={"24px"} alt="" onClick={()=> {setContent('default'); navigate('/')}}/>
                <h5 className="m-0 ps-3 pt-2">New Task</h5>
            </div>
            <form className="p-3">
                <InputField field={"Task Title"} id={"title"} type={"text"} placeholder={"Title"} />
                <label htmlFor="progress" className="mb-1">Progress</label>
                <div className="form-control mb-2" id="progress" contentEditable style={{ height: "250px" }}></div>
                <div className="row mb-2">
                    <div className="col-6">
                        <InputField field={"Assigned To"} id={"assigned-to"} type={"text"} placeholder={"Assigned To"} />
                    </div>
                    <div className="col-6">
                        <Dropdown btnText={"Priority"} items={["High", "Medium", "Low"]} id={"priority-dropdown"} />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-6">
                        <DateInput label={"Deadline"} id={"deadline"} />
                    </div>
                    <div className="col-6">
                        <Dropdown btnText={"Completion Status"} items={["Not Started", "In Progress", "Completed", "On Hold", "Canceled"]} id={"completion-dropdown"} />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-6">
                        <DateInput label={"Starting Date"} id={"starting-date"} />
                    </div>
                    <div className="col-6">
                        <DateInput label={"Completion Date"} id={"deadline"} />
                    </div>
                </div>
                <input type="submit" className="btn w-100 btn-primary mt-3 mb-4" value={"Create Task"} />
            </form>
        </div>
    )
}

export default CreateTask;