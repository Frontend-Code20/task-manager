import { Link } from "react-router";
import { useSelector } from 'react-redux';
import { useRef, useState } from "react";

// Importing components
import TasksItem from "../Task/tasksItem";
import ListBox from "../List/liskBox";

// Helper function to filter upcoming tasks
import { isGreaterDate } from "../../util/util";

// sidebar component
function SideBar() {

    // fetch tasks list from redux store
    const { tasks } = useSelector((state) => state.tasks);

    const sideBarRef = useRef(null);
    const sideBarIconRef = useRef(null);

    // Specific tasks lengths
    const dashboardCount = tasks.length || 0;
    const upcomingCount = tasks.filter(task => isGreaterDate(new Date().toLocaleDateString(), task.startDate)).length;
    const importantCount = tasks.filter(task => task.priority === 'High').length || 0;
    const completedCount = tasks.filter(task => task.status === 'Completed').length || 0;
    const unCompletedCount = tasks.filter(task => task.status === 'Uncompleted').length || 0;

    // state to handle small screen sidebar opening logic
    const [sideBarOpen, showSidebar] = useState(false);

    // handle small screen icon click to sidebar opening logic 
    const handleSidebarIconClick = () => {
        const sideBar = sideBarRef.current;
        const sideBarIcon = sideBarIconRef.current;
        if(!sideBarOpen){
            sideBar.classList.remove('-start-95');
            sideBarIcon.src = '/assets/icons/left-arrow.png';
            showSidebar(true);
            
        }else{
            sideBar.classList.add('-start-95');
            sideBarIcon.src = '/assets/icons/right-arrow.png';
            showSidebar(false);
        }
    }

    return (
        <div className="w-100 h-100 custom-bg-secondary position-absolute -start-95 sidebar" id="sidebar" ref={sideBarRef}>
            <h4 className="p-3 fs-4">Tasks</h4>
            <div className="px-3">

                {/* ListItems for sideBar */}
                <TasksItem item={"Dashborad"} icon={'/assets/icons/dashboard.png'} total={dashboardCount} link={'/'} />
                <TasksItem item={"Upcoming Tasks"} icon={'/assets/icons/upcoming.png'} total={upcomingCount} link={'/tasks/Upcoming'} />
                <TasksItem item={"Important"} icon={'/assets/icons/important.png'} total={importantCount} link={'/tasks/Important'} />
                <TasksItem item={"Completed"} icon={'/assets/icons/completed.png'} total={completedCount} link={'/tasks/Completed'} />
                <TasksItem item={"Uncompleted"} icon={'/assets/icons/uncompleted.png'} total={unCompletedCount} link={'/tasks/Uncompleted'} />
            </div>
            <h4 className="p-3 fs-4">Lists</h4>
            <div className="px-4 w-100">

                {/* List box  */}
                <ListBox />
                <Link to={"/create-list/new"} className="btn btn-success rounded-5 w-100">Add new list</Link>
            </div>
            <div className="position-absolute top-50 start-100 translate-middle d-lg-none sidebar-icon"><img src="/assets/icons/right-arrow.png" className="cr-pointer" id="sidebar-icon" ref={sideBarIconRef} onClick={handleSidebarIconClick} width={"24px"} height={"24px"} alt="right sidebar show icon" /></div>
        </div>
    )
}

export default SideBar;