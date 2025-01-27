import { Link } from "react-router";

// Importing reusable component
import ListDotsMenu from "./listDotsMenu";

// ListItem component
function ListItem({ listName , length, link, listId }) {

    return (
        <div className="d-flex justify-content-between align-items-center position-relative" >
            <Link to={link} className="d-flex justify-content-between btn w-100">
                <div className="d-flex justify-content-between w-100 me-2">
                    <div className="d-flex">
                        <img src="/assets/icons/folder.png" className="me-3" width={"20px"} height={"20px"} alt="list icon" />
                        <h6 className="m-0">{listName}</h6>
                    </div>
                    <span className="">{length}</span>
                </div>
            </Link>
            <div className="position-relative">
                <img src="/assets/icons/three-dots.png" className="list-three-dots" alt="List item Menu"></img>
                
                {/* Three dots menu for each listItem */}
                <ListDotsMenu id={listName} listId={listId}/>
            </div>
        </div>
    )
}


export default ListItem;