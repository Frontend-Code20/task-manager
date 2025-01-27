import UserList from "../model/listModal.js"
import UserTask from "../model/taskModal.js";
import { v4 as uuidv4 } from 'uuid';

// Get the list of user lists
export const readList = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from request user data
         // Fetch lists for the user from the UserList collection
        const { lists } = await UserList.findOne({ userId }).select('lists');
        res.json({ lists }); // Return lists to the client
    } catch (error) {
        res.json({ error: "Internal Server Error" })  // Return error if something goes wrong
    }
}

// Create a new list for the user
export const createList = async (req, res) => {
    try {
        const userId = req.user.id;  // Extract user ID from request user data
        const listId = uuidv4();  // Generate a unique list ID
        const { listName, listItems } = req.body; // Extract list data from request body
        const lists = {
            listId: listId,
            listName: listName,
            listItems: listItems
        }

        // Add the list ID to the related tasks
        const addedToTasks = await addListIdToTask(userId, listItems, listId);

        if (addedToTasks.Ok) {
            // Check if the user already has lists
            const haslist = await hasList(userId);
            if (!haslist) {
                // If the user doesn't have any lists, create a new one
                const newlist = new UserList({ userId, lists });
                await newlist.save();
                res.status(201).json({ listCreated: true });
            } else {
                // If the user already has lists, check if the list name exists
                const listExist = await hasListItem(userId, listName);
                if (!listExist) {
                    // Add the new list to the user's list array
                    await UserList.updateOne({ userId }, { $push: { lists: lists } });
                    res.json({ listCreated: true });
                } else {
                    // If the list name already exists, respond with an error
                    res.status(401).json({ dublicate: true })
                }
                console.log("Updated");
            }
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error)
    }
}

// Update an existing list for the user
export const updateList = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from request user data
        const { listName, listItems, listId } = req.body; // Extract the updated list data
        // Add the list ID to the related tasks
        const addTotask = await addListIdToTask(userId, listItems, listId)
        if(addTotask.Ok){
            // Update the list items for the specified list in the UserList collection
            const result = await UserList.updateOne({ userId, "lists.listName": listName }, {
                $set: {
                    "lists.$.listItems": listItems
                }
            });

            // Respond based on the result of the update operation
            if(result.modifiedCount){
                res.json({ Ok: true });
            }else{
                res.json({ Ok: false });
            }
            console.log(result);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        console.log(error);
    }
}

// Delete a list for the user
export const deleteList = async (req, res) => {
    try {

        const userId = req.user.id; // Extract user ID from request user data
        const { listId, listItems } = req.body; // Extract list ID and items to be deleted
        const removeList = await UserList.updateOne({ userId, "lists.listId": listId }, { $pull: { lists: { listId } } });
        
         // Remove the list from the UserList collection
        const removeFromTask = await removeListIdFromTask(userId, listId);
        
        // If the list was removed from both the list and the tasks, respond with success
        if (removeList?.acknowledged && removeFromTask.Ok) {
            res.json({ Ok: true });
        } else {
            res.json({ Ok: false });
        }

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        console.log(error);
    }
}

// Helper function to check if the user has any lists
async function hasList(userId) {
    const list = await UserList.findOne({ userId });
    return list ? true : false; // Return true if the user has lists, else false
}

// Helper function to check if the user already has a list with a specific name
async function hasListItem(userId, listName) {
    const { lists } = await UserList.findOne({ userId }).select('lists');
    const hasList = lists.find(list => list.listName === listName); // Check if a list with the same name exists
    return hasList ? true : false; // Return true if a list with the same name exists
}

// Helper function to add the list ID to the tasks' listIds
async function addListIdToTask(userId, listItems, listId) {
    try {

        // Get all tasks for the user
        const { tasks } = await UserTask.findOne({ userId }).select('tasks');

        // Iterate through each task and add the list ID if the task is related to any list item
        tasks?.forEach((task, idx) => {
            if (listItems.includes(task.taskId) && !task?.listIds.includes(listId)) {
                tasks[idx].listIds.push(listId); // Add list ID to the task
            }
        });

        // Save the updated tasks back to the UserTask collection
        const save = await UserTask.updateOne({ userId }, { $set: { tasks: tasks } })
        
        // Return success if the tasks were updated
        if (save.acknowledged) {
            return { Ok: true }
        }
    } catch (error) {
        console.log(error);
        return { Ok: false }  // Return failure if there was an error
    }
}

// Helper function to remove the list ID from the tasks' listIds
async function removeListIdFromTask(userId, listId) {
    try {

        const { tasks } = await UserTask.findOne({ userId }).select('tasks'); // Get all tasks for the user
        
        // Iterate through each task and remove the list ID if it's present
        tasks?.forEach((task, idx) => {
            if (task.listIds.includes(listId)) {
                tasks[idx].listIds = tasks[idx].listIds.filter(id => id !== listId); // Remove the list ID
            }
        });

        // Save the updated tasks back to the UserTask collection
        const result = await UserTask.updateOne({ userId }, { $set: { tasks: tasks } })
        
        // Return success if the tasks were updated
        if (result.acknowledged) {
            return { Ok: true }
        }
    } catch (error) {
        console.log(error);
        return { Ok: false }  // Return failure if there was an error
    }
}