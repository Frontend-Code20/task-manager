import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch tasks from the API and handle success and failure states.
export const fetchTasks = createAsyncThunk('data/fetchData', async () => {

    // Retrieve the token from session storage to authenticate the request
    const token = window.sessionStorage.getItem('token');

    // API call to fetch the tasks
    const response = await fetch('http://localhost:1337/api/tasks/read-tasks', {
        method: 'POST',
        headers: {
            // Included token for authorization
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    // Parse the JSON response and extract 'tasks' data
    const { tasks } = await response.json();

    // Return the tasks to be used in redux store
    return tasks;
});

// Create slice for handling the tasks state
const taskSlice = createSlice({
    // slice name
    name: 'tasks',

    // Initial state of the slice: an empty array
    initialState: {
        tasks: [],
        status: 'idle'
    },

    // Reducers for synchronous actions within the slice
    reducers: {
        updateTasksReducer: (state, action) => {
            state.tasks = action.payload;
            console.log(action.payload);
        }
    },

    // Extra reducers to handle the states of the asynchronous fetchTasks thunk
    extraReducers: (builder) => {
        builder
            // When the fetchTasks async action is in pending state (loading)
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            // When the fetchTasks async action is fulfilled (successfully completed)
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Set the lists in the state to the data returned by the API call
                state.tasks = action.payload;
            })
            // When the fetchTasks async action fails (rejected)
            .addCase(fetchTasks.rejected, (state) => {
                state.status = 'failed';
            })
    }
})
// Export the updateTasksReducer action to be used in other parts of the app
export const { updateTasksReducer } = taskSlice.actions;

export default taskSlice.reducer;