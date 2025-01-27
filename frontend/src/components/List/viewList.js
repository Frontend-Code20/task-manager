import { Link, useParams } from "react-router";
import { useSelector } from "react-redux";

// Importing reusable component
import TasksList from "../Task/tasksList";

// View List component to view list in cards
function ViewList({ }) {

    // ListName from url
    const { listName } = useParams();

    // fetch lists and task from redux store
    const { lists } = useSelector((state) => state.lists);
    const { tasks } = useSelector((state) => state.tasks);
    const list = lists.find(list => list.listName === listName)?.listItems || [];

    // Filter listItems tasks from total tasks
    const tasklist = tasks.filter(task => list.includes(task.taskId));

    return (
        <div className="px-4 overflow-auto h-100">
            <div className="d-flex align-items-center justify-content-between ps-2 pt-2">
                <div className="d-flex">
                    {<Link to={'/'} ><img src="/assets/icons/back.png" style={{ cursor: 'pointer' }} alt="back" width={"24px"} height={"24px"} /></Link>}
                    <h5 className="m-0 ms-2">{listName}</h5>
                </div>
                <Link to={'/create-list/' + listName} className="btn btn-primary">Edit</Link>
            </div>
            <div className="overflow-auto">

                {/* Tasklist component */}
                <TasksList taskslist={tasklist} />
            </div>
        </div>
    )
}

export default ViewList;