import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// Importing TaskWrapper component to display tasks
import TaskWrapper from "./tasksWrapper";

// Importing action to fetch tasks from Redux store
import { fetchTasks } from "./Redux/taskReducer";

// Utility functions for date comparisons
import { isEqualDate, isGreaterDate } from "../util/util";


function ViewTasks() {

    // Extracting tasks and status from Redux store
    const { tasks, status } = useSelector((state) => state.tasks);

    // Extracting 'data' parameter from the route to filter tasks
    const { data } = useParams();
    
    // Creating the heading based on the type of tasks being viewed
    const heading = String(data + ' Tasks');

    // Getting the list of tasks based on the filter type ('Recent', 'Upcoming', etc.)
    const tasklist = getTasksList(data, tasks);

    // Dispatch hook to fetch tasks from the Redux store
    const dispatch = useDispatch();

    useEffect(() => {

        // If tasks are idle and not present, fetch them from the API or source
        if(status === 'idle' && tasks?.length === 0){
            dispatch(fetchTasks());
        }

    }, [dispatch]) // effect runs when dispatch, status, or tasks change
    

    return (
        <div className="h-100">
            {/* TaskWrapper component displays tasks based on the filtered list */}
            <TaskWrapper heading={heading} wrapper={'long'}  tasklist={tasklist} />
        </div>
    )
}

// Function to filter tasks based on type (Recent, Upcoming, Important, etc.)
function getTasksList(type, tasks){
    
    let tasklist;
    switch(type){
        case "Recent":
            // Filter tasks that were created today
            tasklist = tasks.filter(task => isEqualDate(task.date, new Date().toDateString()));
            break;
        case "Upcoming":
            // Filter tasks with a start date in the future
            tasklist = tasks.filter(task => isGreaterDate(new Date().toDateString(), task.startDate));
            break;
        case "Important":
            // Filter tasks marked as high priority
            tasklist = tasks.filter(task => task.priority === 'High');
            break;
        case "Completed":
            // Filter tasks marked as completed
            tasklist = tasks.filter(task => task.status === 'Completed')
            break;
        case "Uncompleted":
            // Filter tasks marked as uncompleted
            tasklist = tasks.filter(task => task.status === "Uncompleted");
            break;
        case "High":
            // Filter tasks marked as high priority
            tasklist = tasks.filter(task => task.priority === 'High');
            break;
        case "Medium":
            // Filter tasks marked as medium priority
            tasklist = tasks.filter(task => task.priority === 'Medium');
            break;
        case "Low":
            // Filter tasks marked as low priority
            tasklist = tasks.filter(task => task.priority === 'Low')
            break;
        default:
            // If no valid type is matched, return an empty array
            tasklist = [];
    }
    return tasklist;
}
export default ViewTasks;