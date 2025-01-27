import { alertMessage } from "../helpers/alert";
import { getTaskObject } from "../helpers/taskHelper";
import { updateTask } from "./updateTask";


/**
 * Handles the submission of the task form. It checks the validity of the form 
 * and processes it based on whether the form is for creating or updating a task.
 * 
 * @param {HTMLFormElement} form - The task form element.
 * @param {Object} prgs - An object related to progress (likely used to pass additional form data).
 * @param {Event} event - The event triggered by form submission.
 * @param {string} taskId - The task ID, used for updating an existing task.
 * @returns {Promise<void>} - A promise that resolves once the task is created or updated.
 */

export async function submitTaskForm(form, prgs, event, taskId) {
    
    // Prevent form submission if the form is invalid
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        // Prevent default form submission behavior
        event.preventDefault();
        
        // Gather the task data from the form
        const task = getTaskObject(form, prgs);

        // DOM elements for spinner and alert display
        const taskSpinner = document.getElementById('taskSpinner');
        const taskAlert = document.getElementById('taskAlert');
        const submitBtnText = document.getElementById('submitBtnText');

        // Determine if we're creating or updating a task based on button text
        if(submitBtnText.innerText === 'Create Task'){
            // If creating a new task, call the createNewTask function
            const resultTask = await createNewTask(form, task, taskSpinner, taskAlert);
            return resultTask;
        }else if(submitBtnText.innerText === 'Update Task'){
            // If updating an existing task, call the updateTask function
            await updateTask(task, taskSpinner, taskAlert, taskId)
        }
    }

    // Mark the form as validated to show UI feedback
    form.classList.add('was-validated');
}

/**
 * Sends a request to create a new task in the backend.
 * Displays a loading spinner while waiting for the response,
 * and provides appropriate feedback in the task alert.
 * 
 * @param {HTMLFormElement} form - The task form element.
 * @param {Object} task - The task object containing form data.
 * @param {HTMLElement} taskSpinner - The spinner element to show during submission.
 * @param {HTMLElement} taskAlert - The alert element to display success/error messages.
 * @returns {Promise<Object>} - The result of the task creation request.
 */
async function createNewTask(form, task, taskSpinner, taskAlert) {
    
    try {
        // Retrieve the authorization token from sessionStorage
        const token = window.sessionStorage.getItem('token');

        // Show the loading spinner while waiting for the API request to complete
        taskSpinner.classList.remove('d-none');

        // API request to create the task
        const response = await fetch('http://localhost:1337/api/tasks/create-task', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task }) // Send task data in the request body
        });

        // Parse the JSON response from the server
        const result = await response.json();

        // Hide the loading spinner once the request is complete
        taskSpinner.classList.add('d-none');

        // Check if the task creation was successful
        if (result.Ok) {
            alertMessage("New Task has been successfully created.", 'success', taskAlert)
            form.reset(); // Reset the form
            return result.task
        } else {
            alertMessage("Failed To create New task.", 'danger', taskAlert)
        }
        
    } catch (error) {
        console.log(error);

        // Hide the loading spinner in case of an error
        taskSpinner.classList.add('d-none');
    }
}