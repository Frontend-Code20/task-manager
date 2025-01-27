import mongoose from "mongoose";

// Schema definition for individual list items
const listItems = new mongoose.Schema({
    listId: {type: String, required: true, unique: true},
    listName: { type: String, required: true, unique: true },
    listItems: [{ type: String }]
})

// Main schema for storing user lists
const listSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    lists: [listItems]
})

// Create a model based on the listSchema (connects the schema to the 'userlists' collection in MongoDB)
const UserList = mongoose.model('userlists', listSchema);

export default UserList;