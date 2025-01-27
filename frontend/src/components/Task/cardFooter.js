// Time Helper function
import { setTime } from "../../util/util";

// Card footer Component
function CardFooter({last, time}){

    const lastDate = new Date(last).toLocaleDateString();
    const newTime = setTime(time);

    return(
        <div className="row g-0 p-2">
            <div className="col-8">{"last date: "+ lastDate}</div>
            <div className="col-4 text-end"><span className="me-2">{newTime}</span></div>
        </div>
    )
}


export default CardFooter;