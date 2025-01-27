import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import User from "../model/userModal.js";

// Load environment variables from .env file
dotenv.config();

// Environment variables for secret keys
const SECRET_KEY = process.env.SECRET_KEY; // Secret key for access token
const REFRESH_SECRET = process.env.REFRESH_SECRET; // Secret key for refresh token

const refreshTokens = []; // Store refresh tokens temporarily (use DB for production)

/**
 * Generate a JWT access token for the user
 * @param {Object} user - User object to include in the token payload
 * @returns {string} - Access token
 */
const generateAccessToken = (user) => jwt.sign(user, SECRET_KEY, { expiresIn: "1d" });

/**
 * Generate a JWT refresh token for the user
 * @param {Object} user - User object to include in the token payload
 * @returns {string} - Refresh token
 */
const generateRefreshToken = (user) => jwt.sign(user, REFRESH_SECRET, { expiresIn: "7d" });

/**
 * Register a new user in the system
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void}
 */
export const registerUser = async (req, res) => {
    try {
        // Extract user details from the request body
        const { username, email, password } = req.body;

        // Generate a unique user ID and hash the password
        const _id = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({ _id, username, email, password: hashedPassword });

        // Save the new user to the database
        await newUser.save();

        // Generate access and refresh tokens for the user
        const accessToken = generateAccessToken({ id: _id });
        const refreshToken = generateRefreshToken({ id: _id });

        refreshTokens.push(refreshToken);

        // Set the refresh token in an HttpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, // Ensures that the cookie is only accessible through HTTP requests
            secure: true, // Ensures the cookie is only sent over HTTPS
            sameSite: "Strict" // Ensures the cookie is sent only with same-origin requests
        });

        // Respond with the access token to the client
        res.status(201).json({ accessToken });

    } catch (error) {
        
         // Handle duplicate user error or internal server errors
        if (error?.errorResponse.code) {
            res.status(400).json({ accountExist: true }); // User already exists
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

/**
 * Login a user and issue access and refresh tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void}
 */
export const loginUser = async (req, res) => {
    
    // Extract email and password details from the request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user does not exist, send a 400 error response
    if (!user) return res.status(400).json({ message: "User not found!", accessToken: null });

    // Compare the provided password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ message: "Invalid credentials!" });

    // Generate access and refresh tokens
    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });
    
    refreshTokens.push(refreshToken);

    // Set the refresh token in an HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict"
    });

    // Respond with the access token to the client 
    res.json({ accessToken });
};

/**
 * Handle the refresh token process to generate a new access token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void}
 */
export const refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    // Check if the refresh token exists and is valid
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: "Refresh token not found!" });
    }

    try {
        // Verify the refresh token and extract the user data
        const user = jwt.verify(refreshToken, REFRESH_SECRET);

        // Generate a new access token
        const newAccessToken = generateAccessToken({ id: user.id });

        // Respond with the new access token
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        // If the refresh token is invalid, send an error response
        res.status(403).json({ message: "Invalid refresh token!" });
    }
};

/**
 * Get the information of the currently authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void}
 */
export const userInfo = async (req, res) => {
    try {

        const userId = req.user.id; // Extract the user ID from the JWT payload
        const result = await User.findOne({ _id: userId }).select('username'); // Retrieve user information
        
        // Respond with the user information (username)
        res.status(201).json({ result });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
