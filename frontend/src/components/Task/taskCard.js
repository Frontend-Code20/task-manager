import { useNavigate } from "react-router";
import { useEffect, useRef, useMemo } from "react";

// Importing reusable components
import CardFooter from "./cardFooter";
import CardHeader from "./cardHeader";

// Helper function to slice text
import { getSliceText } from "../../util/util";

// Task card component
function TaskCard({task}){
    
  // Slice the progress text to a maximum of 160 characters for display
    const progress = useMemo(() => getSliceText(task?.progress, 160), [task?.progress]);
    const navigate = useNavigate();

    const progressRef = useRef(null);

    // Update the innerHTML of progressRef with the sliced progress text after render
    useEffect(() => {

        if(progress || progressRef.current){
            progressRef.current.innerHTML = progress;
        }

    }, [progress]);
    
    return(
        <div className="card">
            
            {/* card header component */}
            <CardHeader title={task.title} status={task.status} taskId={task.taskId} />

            {/* card body */}
            <div className="card-body h-150 cr-pointer" onClick={() => navigate('/task/'+task.taskId)}>
                <div className="card-text" ref={progressRef}>{progress}</div>
            </div>

            {/* card footer component */}
            <CardFooter last={task.endDate} time={task.date} />
        </div>
    )
}


export default TaskCard;