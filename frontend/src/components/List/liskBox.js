import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

// Importing resuable component
import ListItem from "./listItem";

// Reducer to fetch listItems
import { fetchListItems } from "../Redux/listReducer";

// ListBox component
function ListBox() {

    // Fetch lists from redux store
    const { lists, status } = useSelector((state) => state.lists);
    const dispatch = useDispatch();

    const [userLists, setUserLists] = useState(lists); 

    // Effect to fetch listItems after rendering
    useEffect(() => {

        if(status === 'idle'){
            dispatch(fetchListItems());
        }

        setUserLists(lists);        

    }, [dispatch, lists]);

    // Map over the lists
    const newtaskList = userLists?.map((item, idx) => {
        return (
            // ListItem component
            <ListItem listName={item.listName} key={idx} length={item.listItems.length} link={'/view-list/' + item.listName} listId={item.listId} />
        )
    })

    return (
        <div className="mb-2 w-100 list-box position-relative">
            {newtaskList}
        </div>
    )
}


export default ListBox;