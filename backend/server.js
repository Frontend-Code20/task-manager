import express from "express";  // Importing express for routing and creating the app
import dotenv from "dotenv";    // Importing dotenv to handle environment variables
import mongoose from "mongoose";  // Importing mongoose to interact with MongoDB
import bodyparser from 'body-parser';  // Importing body-parser to parse incoming request bodies
import cookieParser from "cookie-parser";  // Importing cookie-parser to parse cookies
import authRootes from './rootes/authRoute.js';  // Importing routes for authentication
import taskRoote from './rootes/taskRoote.js';  // Importing routes for tasks
import listRoote from './rootes/listRoute.js';  // Importing routes for lists
import cors from 'cors';  // Importing CORS to handle cross-origin resource sharing

// Initialize express app
const app = express();
const port = process.env.PORT || 1337; // Setting the port to the value in .env or default to 1337

dotenv.config(); // Loading environment variables from the .env file

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (e.g., form submissions)
app.use(bodyparser.urlencoded({ extended: true }));

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// CORS configuration to allow cross-origin requests from the frontend (localhost:3000)
app.use(cors({
    origin: 'http://localhost:3000',  // Allowing requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allowed headers for requests
}));

// Defining API routes for authentication, tasks, and lists
app.use('/api/auth', authRootes);  // Authentication routes (login, register, etc.)
app.use('/api/tasks', taskRoote);  // Task-related routes (create, update, delete tasks)
app.use('/api/list', listRoote);  // List-related routes (create, update, delete lists)

// Connecting to MongoDB using mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("DB Connection Error:", err));

// Default route to test the server connection
app.get('/', async (req, res) => {
    res.end("connected")
})

// Starting the server and listening on the specified port
app.listen(port, () => {
    console.log("Server is running on " + port)
});