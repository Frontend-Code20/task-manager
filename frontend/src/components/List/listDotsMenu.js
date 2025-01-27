import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// Helper function
import { deleteList } from "../../model/createListController";
import { updateListReducer } from "../Redux/listReducer";
import { alertMessage } from "../../helpers/alert";

// Three dots menu for listItems
function ListDotsMenu({ id, listId }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { lists } = useSelector((state) => state.lists)

    // handle Edit logic
    const handleEditClick = () => {
        navigate('/create-list/' + id)
    }

    // handle Delete logic
    const handleDeleteClick = async () => {
        const alert = document.getElementById('taskAlert');
        const mainLoader = document.getElementById('mainLoader');
        mainLoader.classList.remove('d-none');
        const result = await deleteList(listId);
        mainLoader.classList.add('d-none');
        
        if (result?.Ok) {
            const updatedList = lists.filter(list => list.listId !== listId);
            dispatch(updateListReducer(updatedList));
            alertMessage("List is deleted successfully.", "success", alert);
            console.log(updatedList)
        }
        console.log(result);
    }

    return (
        <div className="border border-dark bg-light rounded position-absolute top-0 list-dots-menu z-2 ">
            <ul className="list-unstyled pt-2 w-100 text-start">
                <li className="w-100 custom-btn" onClick={handleEditClick}>Edit</li>
                <li className="w-100 custom-btn" onClick={handleDeleteClick}>Delete</li>
            </ul>
        </div>
    )
}

export default ListDotsMenu;