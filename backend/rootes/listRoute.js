import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createList, updateList, deleteList, readList } from '../controllers/listController.js';

const router = express.Router();

router.post('/read-list', authMiddleware, readList);

router.post('/create-list', authMiddleware, createList);

router.post('/update-list', authMiddleware, updateList);

router.post('/delete-list', authMiddleware, deleteList);

export default router;