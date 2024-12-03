import EmptyScreen from "./emptyScreen";

function TaskWrapper({heading, tasklist, wrapper}) {
    return (
        <div className="mt-2 mb-4 me-4 ms-3 position-relative custom-bg-primary rounded-2" style={{height: "280px"}}>
            <h5 className="m-0 ps-3 pt-2">{heading}</h5>
            <EmptyScreen icon={"./assets/icons/task.png"} message={"Tasks not found"} btnText={"Create New Task"} />
            { wrapper === 'short' && tasklist.length > 0 ? <button type="button" className="btn btn-primary position-absolute bottom-0 w-100">View all</button>: null}
        </div>
    )
}

export default TaskWrapper;