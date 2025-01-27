import mongoose from 'mongoose';

// Schema definition for individual task items
const taskSchema = new mongoose.Schema({
    taskId: { type: String, required: true },
    title: { type: String, required: true },
    progress: { type: String, required: true },
    assignedTo: { type: String, required: true },
    date: { type: Date, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    deadline: { type: Date, required: true },
    status: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    listIds: [{type: String, required: true}]
});

// Main schema for storing user tasks
const userTaskSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    tasks: [taskSchema]  // Embedding taskSchema as an array
});

// Creating the model
const UserTask = mongoose.model('usertasks', userTaskSchema);

export default UserTask;
