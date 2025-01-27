import express from 'express';
import { readTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get task roote
router.post('/read-tasks', authMiddleware, readTasks);

// Add new task roote
router.post('/create-task', authMiddleware, createTask);

// update task roote
router.post('/update-task',authMiddleware, updateTask);

// delete task roote
router.delete('/delete-task',authMiddleware,  deleteTask);

export default router;