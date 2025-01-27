import express from "express";
import { loginUser, registerUser, refreshToken, userInfo } from "../controllers/authController.js";
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/login',  loginUser);

router.post('/register',  registerUser);

router.post('/refresh',  refreshToken);

router.post('/user-info', authMiddleware ,  userInfo);

export default router;