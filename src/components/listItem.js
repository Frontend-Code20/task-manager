
function ListItem({listName, length}){

    return(
        <div className="d-flex justify-content-between mb-2">
            <div className="d-flex">
                <img src="./assets/icons/folder.png" className="me-3" width={"20px"} height={"20px"} alt="list icon" />
                <h6 className="m-0">{listName}</h6>
            </div>
            <span className="">{length}</span>
        </div>
    )
}


export default ListItem;