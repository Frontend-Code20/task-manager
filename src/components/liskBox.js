import ListItem from "./listItem";
import { listboxItems } from "../model/db";

function ListBox({tasks}) {

    const taskList = listboxItems.map((item, idx) => {
        return(
            <ListItem listName={item.listName} key={idx} length={item.listItems.length} />
        )
    })

    return (
        <div className="overflow-auto pe-2 mb-2" style={{maxHeight: "150px"}}>
            {taskList}
        </div>
    )
}


export default ListBox;