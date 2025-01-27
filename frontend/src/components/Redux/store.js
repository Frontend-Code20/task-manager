import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskReducer.js';
import listReducer from './listReducer.js';
import userReducer from './userReducer.js';

const store = configureStore({
    reducer: {
        tasks: taskReducer,
        lists: listReducer,
        userInfo: userReducer
    }
});

export default store;