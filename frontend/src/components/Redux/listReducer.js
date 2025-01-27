import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Fetch the list items from the API and handle success and failure states.
export const fetchListItems = createAsyncThunk('data/fetchListItems', async () => {
      
    // Retrieve the token from session storage to authenticate the request
    const token = window.sessionStorage.getItem('token');

    // API call to fetch the list items
    const response = await fetch('http://localhost:1337/api/list/read-list', {
        method: 'POST',
        headers: {
            // Included the token for authorization
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

     // Parse the JSON response and extract the 'lists' data
    const { lists } = await response.json();

    // Return the lists to be used in the Redux store
    return lists;
})

// Create the slice for handling the list state
const listReducer = createSlice({
    // slice name
    name: 'list',

    // Initial state of the slice: an empty list and an idle status
    initialState: {
        lists: [],
        status: 'idle'
    },

    // Reducers for synchronous actions within the slice
    reducers: {
        updateListReducer: (state, action) => {
            state.lists = action.payload;
        }
    },

    // Extra reducers to handle the states of the asynchronous fetchListItems thunk
    extraReducers: (builder) => {
        builder
        // When the fetchListItems async action is in pending state (loading)
        .addCase(fetchListItems.pending, (state) => {
            state.status = 'loading';  
        })
        // When the fetchListItems async action is fulfilled (successfully completed)
        .addCase(fetchListItems.fulfilled, (state, action) => {
            state.status = 'success';
            // Set the lists in the state to the data returned by the API call
            state.lists = action.payload;
        })
        // When the fetchListItems async action fails (rejected)
        .addCase(fetchListItems.rejected, (state) => {
            state.status = 'failed';  
        })
    }
})

// Export the updateListReducer action to be used in other parts of the app
export const { updateListReducer } = listReducer.actions;

// Export the reducer to be used in the Redux store
export default listReducer.reducer;