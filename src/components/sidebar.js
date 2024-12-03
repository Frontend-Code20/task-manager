import TasksItem from "./tasksItem";
import ListBox from "./liskBox";
import { Link } from "react-router";

function SideBar() {
    return (
        <div className="w-100 h-100 custom-bg-secondary">
            <h4 className="p-3 fs-4">Tasks</h4>
            <div>
                <TasksItem item={"Dashborad"} icon={'./assets/icons/dashboard.png'} total={136} />
                <TasksItem item={"Upcoming Tasks"} icon={'./assets/icons/upcoming.png'} total={90} />
                <TasksItem item={"Important"} icon={'./assets/icons/important.png'} total={90} />
                <TasksItem item={"Completed"} icon={'./assets/icons/completed.png'} total={90} />
                <TasksItem item={"Uncompleted"} icon={'./assets/icons/uncompleted.png'} total={90} />
            </div>
            <h4 className="p-3 fs-4">Lists</h4>
            <div className="px-4">
                <ListBox />  
                <Link to={"/create-list"} className="btn btn-success rounded-5 w-100">Add new list</Link>
            </div>
        </div>
    )
}

export default SideBar;