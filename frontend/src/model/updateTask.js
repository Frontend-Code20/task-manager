import { alertMessage } from "../helpers/alert";

/**
 * Sends a request to the backend to delete a task.
 * 
 * @param {string} taskId - The ID of the task to be deleted.
 * @param {Array} listIds - The list of IDs related to the task.
 * @returns {Promise<{status: boolean}>} - Returns an object indicating whether the task deletion was successful or not.
 */

export async function deleteTask(taskId, listIds) {

    try {
        // Get the authentication token from sessionStorage
        const token = window.sessionStorage.getItem('token');
        const taskAlert = document.getElementById('taskAlert');

        // Make a DELETE request to the API to delete the task
        const response = await fetch('http://localhost:1337/api/tasks/delete-task', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Send the token for authorization
                'Content-Type': 'application/json'  // Send data as JSON
            },
            body: JSON.stringify({ taskId, listIds }) // Include taskId and listIds in the body
        });

        // Parse the response from the backend
        const result = await response.json();

        // If the task deletion is acknowledged, show a success message and return the status
        if (result?.acknowledged) {
            alertMessage('Task has been deleled.', 'success', taskAlert)
            return { status: true } // Indicate that the task was successfully deleted
        }
    } catch (error) {
        console.log(error);
        return { status: false } // Indicate that the task is not deleted
    }
}

/**
 * Sends a request to the backend to update a task's details.
 * 
 * @param {Object} task - The task object containing the updated details.
 * @param {HTMLElement} taskSpinner - The spinner element to show while the task is being updated.
 * @param {HTMLElement} taskAlert - The alert element to show success or error messages.
 * @param {string} taskId - The ID of the task to be updated.
 */
export async function updateTask(task, taskSpinner, taskAlert, taskId) {
    try {

        // Get the authentication token from sessionStorage
        const token = window.sessionStorage.getItem('token');

        // Show the spinner to indicate that the task is being updated
        taskSpinner.classList.remove('d-none');

        // Make a POST request to the API to update the task
        const response = await fetch('http://localhost:1337/api/tasks/update-task', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Send the token for authorization
                'Content-Type': 'application/json' // Send data as JSON
            },
            body: JSON.stringify({ taskId, task }) // Include taskId and updated task in the body
        })

        // Parse the response from the backend
        const result = await response.json();

        // If the task update is acknowledged, show a success message
        if (result?.acknowledged) {
            alertMessage('Task has been updated successfully.', 'success', taskAlert)
        } else {
            // If the update failed, show an error message
            alertMessage('Failed to update task.', 'danger', taskAlert)
        }

        // Hide the spinner after the task is updated
        taskSpinner.classList.add('d-none');

    } catch (error) {
        console.log(error);
        
        // Ensure the spinner is hidden in case of an error
        taskSpinner.classList.add('d-none');
    }
}