import TaskWrapper from "./tasksWrapper";
import { BarContext } from "./globalState";
import { useNavigate } from "react-router";
import { useContext } from "react";

function Dashboard(props) {

    const { setContent } = useContext(BarContext);
    const navigate = useNavigate();

    return (
        <div className="h-100 overflow-auto position-relative">
            <TaskWrapper heading={"Recent Tasks"} tasklist={[]} wrapper={"short"} />
            <TaskWrapper heading={"Upcoming Tasks"} tasklist={[]} wrapper={"short"} />
            <TaskWrapper heading={"Important Tasks"} tasklist={[]} wrapper={"short"} />
            <TaskWrapper heading={"High Tasks"} tasklist={[]} wrapper={"short"} />
            <TaskWrapper heading={"Medium Tasks"} tasklist={[]} wrapper={"short"} />
            <TaskWrapper heading={"Low Tasks"} tasklist={[]} wrapper={"short"} />
            <TaskWrapper heading={"Completed Tasks"} tasklist={[]} wrapper={"short"} />
            <TaskWrapper heading={"Uncompleted Tasks"} tasklist={[]} wrapper={"short"} />
            <button type="button" className="btn btn-secondary position-fixed" style={{ bottom: "30px", right: "20px" }} onClick={() => {
                setContent('editBar');
                navigate('/create')
            }}><img src="./assets/icons/addtask.png" className="pe-2" alt="task add icon" width={"32px"} height={"24px"} />New Task</button>
        </div>
    )
}

export default Dashboard;