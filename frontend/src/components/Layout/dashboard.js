import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';

// Importing components
import TaskWrapper from "../tasksWrapper";
import SearchBar from "../searchbar";

// Helper functions to fetch tasks and compare date
import { fetchTasks } from "../Redux/taskReducer";
import { isEqualDate, isGreaterDate } from "../../util/util";

// Dashboard component
function Dashboard(props) {

    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const dispatch = useDispatch();

    // 
    // Fetch tasks from redux store
    const { tasks, status } = useSelector((state) => state.tasks);

    // State for user tasks
    const [userTasks, setUserTasks] = useState(tasks);

    // State for recent tasks
    const [recentTasks, setRecentTasks] = useState([]);

    useEffect(() => {

        // Fetch tasks from database and store it in redux store
        if (status === 'idle') {
            dispatch(fetchTasks());
        }

        // Set tasks to usertasks in each render
        setUserTasks(tasks);

        // Set previous scroll position
        if (scrollRef.current) {
            scrollRef.current.scrollTop = parseInt(window.sessionStorage.getItem('SCROLL_POSITION'), 10) || 0;
        }

        // Handle scroll bahavior to save it's value in session storage
        const handleScroll = () => {
            if (scrollRef.current) {
                window.sessionStorage.setItem('SCROLL_POSITION', scrollRef?.current.scrollTop);
            }
        }

        // Calculate and set recent tasks
        const recentTasks = userTasks.filter(task => isEqualDate(new Date().toDateString(), task.date));
        const sortedTasks = recentTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecentTasks(sortedTasks);
        
        // Add event listener to scroll dashboard div
        scrollRef.current?.addEventListener('scroll', handleScroll);

        return () => {
            // Clean up event listener from dashboard div
            scrollRef?.current?.removeEventListener('scroll', handleScroll);
        }

    }, [status, dispatch, userTasks, tasks])

    const handleNewTaskButtonLogin = () => {
        navigate('/create/new')
    }

    return (
        <div className="h-100 overflow-auto position-relative" ref={scrollRef}>

            {/* Search bar for small screen  */}
            <SearchBar className={"w-100 mt-2 d-block d-sm-none"} />

            {/* Task wrapper components for section tasks */}
            <TaskWrapper heading={"Recent Tasks"} tasklist={recentTasks} wrapper={"short"} link={'/tasks/Recent'} />
            <TaskWrapper heading={"Upcoming Tasks"} tasklist={userTasks.filter(task => isGreaterDate(new Date().toDateString(), task.startDate))} wrapper={"short"} link={'/tasks/Upcoming'} />
            <TaskWrapper heading={"High Tasks"} tasklist={userTasks.filter(task => task.priority === 'High')} wrapper={"short"} link={'/tasks/High'} />
            <TaskWrapper heading={"Medium Tasks"} tasklist={userTasks.filter(task => task.priority === 'Medium')} wrapper={"short"} link={'/tasks/Medium'} />
            <TaskWrapper heading={"Low Tasks"} tasklist={userTasks.filter(task => task.priority === 'Low')} wrapper={"short"} link={'/tasks/Low'} />
            <TaskWrapper heading={"Completed Tasks"} tasklist={userTasks.filter(task => task.status === 'Completed')} wrapper={"short"} link={'/tasks/Completed'} />
            <TaskWrapper heading={"Uncompleted Tasks"} tasklist={userTasks.filter(task => task.status === 'Uncompleted')} wrapper={"short"} link={'/tasks/Uncompleted'} />

            {/* Button to navigate to new task roote */}
            <button type="button" className="btn btn-secondary position-fixed" style={{ bottom: "30px", right: "20px" }} onClick={handleNewTaskButtonLogin}>
                <img src="./assets/icons/addtask.png" className="pe-2" alt="task add icon" width={"32px"} height={"24px"} />
                New Task
            </button>
        </div>
    )
}

export default Dashboard;