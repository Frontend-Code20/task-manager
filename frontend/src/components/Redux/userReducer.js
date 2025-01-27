import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch user info from the API and handle success and failure states
export const fetchUser = createAsyncThunk('data/fetchUser', async () => {

    // Retrieve the token from session storage for authenticate the request
    const token = window.sessionStorage.getItem('token');

    // Call the API to fetch the data
    const response = await fetch('http://localhost:1337/api/auth/user-info', {
        method: 'POST',
        headers: {
            // Included token for authorization
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    // Parse the JSON response and extract 'result' user data
    const { result } = await response.json();

    // Return user info to be used in store
    return result;
});

// Create slice for handling the user state
const userReducer = createSlice({
    // slice name
    name: 'user',

    // Initail state of the slice: an empty array
    initialState: {
        userInfo: [],
        status: 'idle'
    },

    // Reducers for synchronous actions within the slice
    reducers: {},

    // Extra reducers to handle the states of the asynchronous fetchUser thunk
    extraReducers: (builder) => {
        builder
            // When the fetchUser async action is in pending state (loading)
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading'
            })
            // When the fetchUser async action is fulfilled (successfully completed)
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'success'
                // Set the lists in the state to the data returned by the API call
                state.userInfo = action.payload;
            })
             // When the fetchUser async action fails (rejected)
            .addCase(fetchUser.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export default userReducer.reducer;