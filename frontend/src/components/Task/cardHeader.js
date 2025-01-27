// Importing component
import ThreeDotMenu from "../threeDotMenu";

// Helper function to slice maximum characters
import { getSliceText } from "../../util/util";

// Card header component
function CardHeader({title, status, taskId}){

    const slicedText = getSliceText(title, 11);
    
    return(
        <div className="row p-2 g-0 position-relative">
            <div className="col-7"><h5 className="card-title">{slicedText}</h5></div>
            <div className="col-4"><span className="form-text">{status}</span></div>
            <div className="col-1 three-dots"><img src="/assets/icons/three-dots.png" width={"24px"} height={"24px"} alt=""/></div>

            {/* Three dots menu component */}
            <ThreeDotMenu id={taskId}/>
        </div>
    )
}


export default CardHeader;