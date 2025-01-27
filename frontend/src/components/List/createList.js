import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";

// Importing reusable components
import InputField from "../Task/inputfield";
import CheckBox from "./checkbox";
import EmptyScreen from "../emptyScreen";

// Helper function to fetch data from redux store
import { fetchListItems } from "../Redux/listReducer";
import { fetchTasks } from "../Redux/taskReducer";

// Helper function to handle create or update tasks logic
import { createNewList, updateList } from "../../model/createListController";
import { alertMessage } from "../../helpers/alert";

// Create-list Component
function CreateList() {

    // List name from url
    const { listName } = useParams();

    // Fetch tasks and list from redux store
    const { tasks } = useSelector((state) => state.tasks);
    const { lists, status } = useSelector((state) => state.lists);

    // Find the list by the listName from the URL to edit or view it
    const list = lists?.find(list => list.listName === listName);

    const dispatch = useDispatch();

    const [spinner, showSpinner] = useState(false); // State for showing spinner during form submission

    const submitBtnRef = useRef(null); // Reference for the submit button
    const listFormRef = useRef(null); // Reference for the form

    // State for holding the list of taskIds when creating or updating a list
    const [newList, setNewList] = useState(list?.listItems || []);

    // Effect to fetch task and list, handle form submit and adding or removing event listener
    useEffect(() => {

        const alert = document.getElementById('taskAlert');

        const listForm = listFormRef.current;
        const submitBtn = submitBtnRef.current;

        // Fetch list items if the status is idle (no data yet)
        if (status === 'idle') {
            dispatch(fetchListItems())
        }

        // If tasks are not yet fetched, fetch them again
        if (status === 'idle' && tasks?.length === 0) {
            dispatch(fetchTasks());
        }

        // Handle form submit logic: create or update list based on button text
        const handleSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(listForm);
            const listName = formData.get('listName')

            showSpinner(true); // Show spinner while the request is being processed

            // If the button text is "Create List", we create a new list
            if (submitBtn.innerText === "Create List") {

                // Call createNewList helper function
                const result = await createNewList(listName, newList);
                if (result?.listCreated) {
                    alertMessage("List has been created.", 'success', alert);
                    dispatch(fetchListItems()); // Fetch updated list items
                } else if (result?.dublicate) {
                    alertMessage("This list name is already exist, try another.", 'danger', alert);
                } else {
                    alertMessage("Unexpected Error while creating new list.", 'danger', alert);
                }

                // If the button text is "Update List", update the list    
            } else if (submitBtn.innerText === "Update List") {

                // Call updateList helper function
                const result = await updateList(listName, newList, list.listId);
                if (result?.Ok) {
                    alertMessage("List is updated successfully.", 'success', alert);
                    dispatch(fetchListItems());
                } else {
                    alertMessage("Unable to update list.", 'danger', alert);
                }
                console.log(result);
            }
            showSpinner(false); // Hide spinner once the operation is complete

        }

        // Add event listener to form submit
        listForm?.addEventListener('submit', handleSubmit);

        return () => {
            // Cleanup event listener on component unmount
            listForm?.removeEventListener('submit', handleSubmit);
        }

    }, [listName, dispatch, newList, tasks, list]);

    // Function to add a taskId to the new list
    const addNewTaskToList = (taskId) => {
        setNewList([...newList, taskId])
    }

    // Function to remove a taskId from the new list
    const removeTaskFromList = (taskId) => {
        const list = newList.filter(Id => Id !== taskId)
        setNewList(list);
    }

    // Mapping tasks to create list items with checkboxes
    const listItem = tasks.map((item, idx) => {
        return (
            <li className="list-group-item d-flex row g-0" key={"list-item-" + idx}>
                <div className="col-6">
                    <label htmlFor={"listItem" + idx} >{item.title}</label>
                </div>
                <div className="col-5">
                    <span>{item.priority}</span>
                </div>
                <div className="col-1">

                    {/* Checkbox component for adding/removing tasks from list */}
                    <CheckBox isChecked={list?.listItems.includes(item.taskId) || false} taskId={item.taskId} addNewTaskToList={addNewTaskToList} removeTaskFromList={removeTaskFromList} />
                </div>
            </li>
        )
    });

    return (
        <div className="container-fluid overflow-auto">
            <div className="d-flex pt-4">
                {/* Back link */}
                <Link to={'/'} >
                    <img src="../assets/icons/back.png" className="cr-pointer" width={"24px"} height={"24px"} alt="" />
                </Link>
                <h5 className="m-0 ms-2">New List</h5>
            </div>
            <div className="container p-4">

                {/* List form */}
                <form id="listForm" ref={listFormRef}>
                    <div className="row">
                        <div className="col-6">

                            {/* Input component */}
                            <InputField field={"List Name"} type={"text"} id={'list-name'} placeholder="Enter List Name" value={listName === 'new' ? "" : listName} name={"listName"} />
                        </div>
                    </div>

                    {/* Display the list of tasks or an empty screen if there are no tasks */}
                    <div className="mt-3">
                        <label>Select Tasks</label>
                        <ul className="list-group overflow-auto p-2 border border-primary" style={{ height: '300px' }}>
                            {listItem?.length === 0 ? <EmptyScreen icon={"/assets/icons/task.png"} message={"Tasks Not Found"} btnText={"Create New Task"} /> : listItem}
                        </ul>
                    </div>

                    {/* Submit button with a spinner */}
                    <button type="submit" className="btn btn-primary mt-3">
                        <div className={`spinner-border spinner-border-sm text-white me-2 ${spinner ? '' : 'd-none'}`} id="listSpinner">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <span id="createListBtnText" ref={submitBtnRef}>{listName === 'new' ? "Create List" : "Update List"}</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateList;