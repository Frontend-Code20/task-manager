import { Link } from "react-router";
import { useMemo } from "react";

// Importing components
import EmptyScreen from "./emptyScreen";
import TasksList from "./Task/tasksList";

// Helper function to filter task for small wrapper
import { getCardForShort } from "../util/util";

// TaskWrapper component that displays a list of tasks. 
// The appearance and behavior are determined by the 'wrapper' prop (either 'long' or 'short').
function TaskWrapper({ heading, wrapper, tasklist = [], link }) {

    const getTasks = useMemo(() => getCardForShort(tasklist, wrapper), [tasklist, wrapper]);

    return (
        <div className={`mt-2 mb-4 me-4 ms-3 position-relative custom-bg-primary rounded-2 pb-5`} >
            <div className="d-flex align-items-center ps-2 pt-2">
                {wrapper === 'long' ? <Link to={'/'} >
                    <img src="/assets/icons/back.png" className="cr-pointer" alt="back" width={"24px"} height={"24px"} />
                </Link> : null}
                <h5 className="m-0 ms-2">{heading}</h5>
            </div>

            {/* If there are tasks, render the list of tasks; otherwise, display an EmptyScreen 
             component with a message and a "Create New Task" button.  */}
            {tasklist.length > 0 ? <TasksList taskslist={getTasks} /> : <EmptyScreen icon={"/assets/icons/task.png"} message={"Tasks not found"} btnText={"Create New Task"} />}
            {wrapper === 'short' && tasklist.length > 0 ? <Link role="btn" to={link} className="btn btn-primary position-absolute bottom-0 w-100">View all</Link> : null}
        </div>
    )
}

export default TaskWrapper;