import { Link } from "react-router";

function TasksItem({ item, icon, total, link }) {
    return (
        <Link to={link} className="px-3 d-flex justify-content-between btn">
            <div className="d-flex">
                <img src={icon} alt={item} className="me-3" width={"24px"} height={"24px"} />
                <h6 className="m-0">{item}</h6>
            </div>
            <span className="badge bg-warning text-center m-0">{total}</span>
        </Link>
    )
}

export default TasksItem;