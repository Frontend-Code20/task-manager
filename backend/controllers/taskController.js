import UserTask from "../model/taskModal.js";
import UserList from '../model/listModal.js';
import { v4 as uuidv4 } from 'uuid';

// Get user Tasks
export const readTasks = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from the request
        const userTasks = await UserTask.findOne({ userId }).select('tasks'); // Fetch the user's tasks

        let tasks = [];
        if (userTasks) {
            tasks = userTasks.tasks; // If tasks are found, assign them to the tasks array
        }
        res.json({ tasks }) // Respond with the tasks
    } catch (error) {
        console.log(error);
        res.status(501).json({ error: "Internal Server Error" });  // Return 501 status on error  
    }
};

// Add new Tasks
export const createTask = async (req, res) => {
    try {
        const { task } = req.body;  // Extract task details from the request body
        const userId = req.user.id;  // Get the user ID
        const taskId = uuidv4();  // Generate a unique task ID
        task.taskId = taskId;  // Assign the generated task ID to the task
        task.listIds = [];  // Initialize listIds as an empty array

        // Check if the user already has tasks
        const checkTask = await hasTask(userId);
        if (!checkTask) {
            // If the user doesn't have tasks, create a new task record
            const newTask = new UserTask({ userId, tasks: [task] });
            await newTask.save();

            // Respond with success
            res.json({ Ok: true, task });
            console.log("New");
        } else {
            // If the user already has tasks, add the new task to the existing task list
            await addTaskToUser(userId, task);

            // Respond with success
            res.json({ Ok: true, task });
            console.log("new updated");
        }
    } catch (error) {
        res.status(501).json({ error: "Internal Server Error" }); // Handle any errors with a 501 status
        console.log(error);
    }

};

// Update an existing task
export const updateTask = async (req, res) => {
    const userId = req.user.id; // Extract user ID from the request
    const { taskId, task } = req.body; // Extract task ID and updated task details from the request

    // Update the task in the UserTask collection
    const result = await UserTask.updateOne(
        { userId, "tasks.taskId": taskId },  // Find the task based on user ID and task ID
        {
            $set: {
                "tasks.$.task": task.title,
                "tasks.$.progress": task.progress,
                "tasks.$.assignedTo": task.assignedTo,
                "tasks.$.priority": task.priority,
                "tasks.$.date": task.date,
                "tasks.$.deadline": task.deadline,
                "tasks.$.status": task.status,
                "tasks.$.startDate": task.startDate,
                "tasks.$.endDate": task.endDate,
                "tasks.$.listIds": task.listIds
            },
        },
        { new: true } // Return the updated task document
    )
    res.json(result); // Respond with the updated task
};

// Delete a task
export const deleteTask = async (req, res) => {
    try {
        const { taskId, listIds } = req.body; // Extract task ID and list IDs from the request body
        const userId = req.user.id;  // Get the user ID

        // If the task is associated with any lists, remove it from those lists
        if (listIds?.length > 0) {
            await UserList.updateOne(
                { userId, "lists.listId": { $in: listIds } }, // Find lists that contain the task
                { $pull: { "lists.$[elem].listItems": taskId } }, // Pull the taskId from listItems
                { arrayFilters: [{ "elem.listId": { $in: listIds } }] } // Ensure we're filtering by listId
            )
            console.log("has list");
        }

        // Remove the task from the user's task list
        const result = await UserTask.updateOne({ userId }, { $pull: { tasks: { taskId } } });


        res.json(result);  // Return the result of the deletion
        console.log(listIds, userId);
    } catch (error) {
        res.status(501).json({ error: "Internal Server Error" }); // Return error response if an error occurs
        console.log(error);
    }
}

// Helper function to check if the user already has tasks
async function hasTask(userId) {
    const task = await UserTask.findOne({ userId }); // Find a task document for the user
    return task ? true : false; // Return true if the user has tasks, otherwise false
}

// Helper function to add a new task to an existing user's task list
async function addTaskToUser(userId, newTask) {
    try {
        const result = await UserTask.updateOne(
            { userId },
            { $push: { tasks: newTask } } // Push the new task into the user's task list
        )
        return result; // Return the result of the update operation
    } catch (error) {
        console.log('Error in add new task' + error);
    }
}