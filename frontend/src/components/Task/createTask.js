import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Importing quill
import Quill from 'quill';

// Importing reusable components
import InputField from "./inputfield";
import Dropdown from "./dropdown";
import DateInput from "./dateInput";

// Helper functions to submit form logic and fetch tasks from redux store
import { submitTaskForm } from "../../model/createTaskController";
import { fetchTasks, updateTasksReducer } from "../Redux/taskReducer";

// Importing quill snow theme css
import 'quill/dist/quill.snow.css'

// Component to create new task
function CreateTask() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Task Id from url 
    const { taskId } = useParams();

    // fetch tasks from redux store
    const { tasks, status } = useSelector((state) => state.tasks);

    const [task, setTask] = useState(tasks.find(task => task.taskId === taskId));
    
    const taskFormRef = useRef(null);
    const quillRef = useRef(null);

    // Effect to create an quill object once after rendering
    useEffect(() => {
        if (!quillRef.current) {
            quillRef.current = new Quill('#progress', {
                theme: 'snow'
            });
        }

    }, []);

    // Effect to fetch, handle form submit login and adding or remove event listener
    useEffect(() => {

        if (!quillRef.current || !taskFormRef.current) return;

        const taskForm = taskFormRef.current;

        if(status === 'idle'){
            dispatch(fetchTasks());
        }

        if (taskId !== 'new') {
            quillRef.current.clipboard.dangerouslyPasteHTML(task?.progress);
        }

        if(taskId !== 'new'){
            const curretTask = tasks.find(task => task.taskId === taskId) 
            setTask(curretTask);
        }
        
        // Handle form submot logic Async
        const handleFormClick = async (event) => {
            event.preventDefault();
            const progress = quillRef.current.root.innerHTML;
            const task = await submitTaskForm(taskForm, progress, event, taskId);
            if (task) {
                const newtasks = [...tasks, task];
                dispatch(updateTasksReducer(newtasks));
            }
        }

        // Add event listener to form
        taskForm?.addEventListener('submit', handleFormClick);

        return () => {
            // Clean up event listener from form
            taskForm?.removeEventListener('submit', handleFormClick);
        }

    }, [taskId, dispatch, tasks]);

    return (
        <div className="m-2 h-100 custom-bg-primary position-relative rounded-2 overflow-auto">
            <div className="d-flex align-items-center ps-2">
                <img src="../assets/icons/back.png" className="mt-2 cr-pointer" width={"24px"} height={"24px"} alt="" onClick={() => navigate('/')} />
                <h5 className="m-0 ps-3 pt-2">New Task</h5>
            </div>

            {/* create new task form */}
            <form className="p-3" noValidate id="newTaskForm" ref={taskFormRef}>

                {/* input field component */}
                <InputField field={"Task Title"} id={"taskTitle"} type={"text"} value={taskId === 'new' ? "" : task?.title} placeholder={"Title"} name={"title"} />
                <label htmlFor="progress" className="mb-1">Progress</label>
                <div className="form-control mb-2" id="progress" style={{ height: "250px" }}></div>
                <div className="row mb-2">
                    <div className="col-12 col-md-6">
                        
                        {/* input field component */}
                        <InputField field={"Assigned To"} id={"assigned-to"} value={taskId !== 'new' ? task?.assignedTo : ''} type={"text"} placeholder={"Assigned To"} name={"assignedTo"} />
                    </div>
                    <div className="col-12 col-md-6">
                        
                        {/* Dropdown component */}
                        <Dropdown btnText={"Priority"} items={["High", "Medium", "Low"]} id={"priority-dropdown"} name={'priority'} value={taskId !== 'new' ? task?.priority : null} />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-12 col-md-6">
                        
                        {/* Date component */}
                        <DateInput label={"Deadline"} id={"deadline"} value={taskId !== 'new' ? task?.deadline : ''} name={"deadline"} />
                    </div>
                    <div className="col-12 col-md-6">
                        
                        {/* Dropdown component */}
                        <Dropdown btnText={"Completion Status"} items={["Not Started", "In Progress", "Completed", "Uncompleted", "On Hold", "Canceled"]} id={"completion-dropdown"} name={"status"} value={taskId !== 'new' ? task?.status : null} />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-12 col-md-6">
                        
                        {/* Date component */}
                        <DateInput label={"Starting Date"} value={taskId !== 'new' ? task?.startDate : ''} id={"starting-date"} name={"startingDate"} />
                    </div>
                    <div className="col-12 col-md-6">
                        
                        {/* Date component */}
                        <DateInput label={"Completion Date"} value={taskId !== 'new' ? task?.endDate : ''} id={"completion-date"} name={"completionDate"} />
                    </div>
                </div>
                
                {/* Submit button with a spinner */}
                <button type="submit" className="btn w-100 btn-primary mt-3 mb-4">
                    <div className="spinner-border spinner-border-sm text-white me-3 d-none" id="taskSpinner">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <span id="submitBtnText">{taskId === 'new' ? "Create Task" : 'Update Task'}</span>
                </button>
            </form>
        </div>
    )
}

export default CreateTask;