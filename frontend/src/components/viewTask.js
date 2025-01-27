import { useParams, Link } from "react-router";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

// Importing reusable component for displaying task details
import ViewTaskCard from "./viewTaskCard";

// Importing the action to fetch tasks from the Redux store
import { fetchTasks } from "./Redux/taskReducer";

function ViewTask() {

    // Extracting the tasks state and the status from Redux store
    const { tasks, status } = useSelector((state) => state.tasks);

    // Extracting the taskId from the URL parameters (for route matching)
    const { taskId } = useParams();

    // Finding the task in the tasks array based on the taskId from URL
    const task = tasks.find(task => task.taskId === taskId) || [];

    // Formatting the dates for the task (start date, end date, and deadline)
    const newStartDate = new Date(task.startDate).toLocaleDateString();
    const newEndDate = new Date(task.endDate).toLocaleDateString();
    const newDeadLine = new Date(task.deadline).toLocaleDateString();

    // Ref for progress display
    const progressRef = useRef(null);

    // Dispatch hook to send actions to the Redux store
    const dispatch = useDispatch();

    useEffect(() => {

        // Set the progress inside the ref if task progress is available
        if (progressRef.current && task?.progress) {
            progressRef.current.innerHTML = task?.progress;
        }

        // Dispatch the fetchTasks action if no tasks are available and status is idle
        if (status === 'idle' && tasks?.length === 0) {
            dispatch(fetchTasks());
        }

    }, [task, dispatch]) // Re-run effect when task or dispatch changes

    return (
        <div className="">
            <div className="d-flex align-items-center ps-2 pt-2">
                {/* Link to go back to the previous page */}
                {<Link to={'/'} >
                    <img src="/assets/icons/back.png" className="cr-pointer" alt="back" width={"24px"} height={"24px"} />
                </Link>}
                {/* Task title */}
                <h5 className="m-0 ms-2">{task.title}</h5>
            </div>

             {/* Task details */}
            <div className="p-4">
                <div className="row">
                     {/* Displaying task details in individual cards */}
                    <div className="col-3"> <ViewTaskCard title={'Priority'} text={task.priority} /> </div>
                    <div className="col-3"> <ViewTaskCard title={'Status'} text={task.status} /> </div>
                    <div className="col-3"> <ViewTaskCard title={'Start Date'} text={newStartDate} /> </div>
                    <div className="col-3"> <ViewTaskCard title={'End Date'} text={newEndDate} /> </div>
                    <div className="col-3 mt-4"> <ViewTaskCard title={'Deadline'} text={newDeadLine} /> </div>
                </div>
                {/* Displaying task progress */}
                <div className="mt-4">
                    <div ref={progressRef}></div>
                </div>
            </div>
        </div>
    )
}

export default ViewTask;