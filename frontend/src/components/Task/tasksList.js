import { useMemo } from "react";

// Importing component
import TaskCard from "./taskCard";

// Tasks list component that renders list of cards
function TasksList({ taskslist }) {

    // Mapping over the taskslist to create a new array of TaskCard components, one for each task
    const tasks = useMemo(() => taskslist.map((item, idx) => {
        return (
            <div className="col-12 col-sm-6 col-lg-4" key={"col"+idx}>

                {/* Rendering each task inside a TaskCard component with a unique key for each task and its container */}
                <TaskCard task={item} key={"task" + idx} />
            </div>
        )
    }), [taskslist]);

    return (
        <div className="row p-4 g-2 w-100 overflow-auto">
            {tasks}
        </div>
    )
}


export default TasksList;