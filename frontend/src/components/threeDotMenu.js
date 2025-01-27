import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

// Function to fetch and update the data in redux store
import { deleteTask } from "../model/updateTask";
import { updateTasksReducer } from "./Redux/taskReducer";
import { fetchListItems } from "./Redux/listReducer";

// Three Dots Menu Component
function ThreeDotMenu({ id }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch tasks from redux store
    const { tasks } = useSelector((state) => state.tasks)

    // Navigate to the task edit page with the task ID
    const handleEditClick = () => {
        navigate('/create/' + id)
    }

    // Handle task deletion. After deletion, update the tasks in Redux store and fetch updated list items
    const handleDeleteClick = async () => {
        const task = tasks?.find(task => task.taskId === id);
        const listIds = task?.listIds;
        const result = await deleteTask(id, listIds);
        if(result?.status){
            const filteredTasks = tasks.filter(task => task.taskId !== id);
            dispatch(updateTasksReducer(filteredTasks));
            dispatch(fetchListItems());
        }
    }

    return (
        <div className="border border-dark bg-light w-50 rounded position-absolute three-dots-menu" style={{ zIndex: 999 }}>
            <ul className="list-unstyled pt-2">
                <li className="w-100 custom-btn" onClick={handleEditClick}>Edit</li>
                <li className="w-100 custom-btn" onClick={handleDeleteClick}>Delete</li>
            </ul>
        </div>
    )
}

export default ThreeDotMenu;