# **Task Manager Using React, Bootstrap and Node.Js**

This is an online task manager web app using React, Bootstrap, and Node.js.By creating an account, the user can create tasks, and by just logging in, the user can create new tasks, modify, and delete existing tasks from everywhere. In addition, the user can create, update, and delete custom lists to organize tasks.

## **1. Features**
- Online (Access task by login)
- Create tasks
- Update tasks
- Delete tasks
- Create, update , delete custom lists

## **2. Technologies Used**
- JavaScript
- React
- Bootstrap
- NodeJS
- MongoDB Atlas

## **3. Get Started (Installation)**

The project directory structure is organized in two sub directories `Frontend` and `Backend`, which makes it easy to use. All frontend logic and configuration will be in `Frontend` directory, and all backend logic and configuration will be in `backend` directory.

> **Important Notes:**
> - You must have installed `Node.Js` on your device.


> **Important Nots:**
> - You must have installed `Node.Js` on your device.


**Root Directory:**
``` 
Task-Manager
 ├── backend
 └── frontend
```

Download the root directory and open it in a code editor (e.g., VS Code).

This directory contains the frontend code (components, helpers, modals, utils) and the backend code (routes, controllers, models, etc.). We need to install some important libraries to run the app.

> **Important Notes:** 
> - The libraries for the frontend must be installed in the Frontend directory. 
> - The libraries for the backend must be installed in the Backend directory. 
> - Installing libraries in the root directory may cause unexpected errors.

### Let's set up the root directory step by step.

- #### **Step #01:**
   + Create a new root folder for your project, named `Task-Manager`.

- #### **Step #02:**
  
    + Copy the `backend` folder from the downloaded code and paste it into the root folder. 

- #### **Step #03:**

    + Switch to the `backend` folder by running `cd backend`, and install these libraries: 
        ```bash
        -> npm install express
        -> npm install mongoose
        -> npm install dotenv
        -> npm install body-parser
        -> npm install cookie-parser
        -> npm install uuid
        -> npm install cors
        -> npm install jsonwebtoken
        -> npm install bcryptjs

- #### **Step #04:**
    + In the `backend` folder, open the `package.json` file and add the type module:
    ```json
        {
            "type": "module",
            "dependencies": {
                "bcryptjs": "^2.4.3",
                "body-parser": "^1.20.3",
                "cookie-parser": "^1.4.7",
                "cors": "^2.8.5",
                "dotenv": "^16.4.7",
                "express": "^4.21.2",
                "jsonwebtoken": "^9.0.2",
                "mongoose": "^8.9.5",
                "uuid": "^11.0.5"
            }
        }
    ```
    + Switch back to the root folder by running `cd ../`.

- #### **Step #05:**
    + In the root folder, now configure the `frontend` folder.
    + Run the following command:
        ``` 
        -> npx create-react-app frontend

    + This will create a folder called `frontend` in the root directory. 

- #### **Step #06:**    
    + Now, install libraries in the `frontend` folder by running these commands:
        ```bash
        -> npm install bootstrap
        -> npm install react-router
        -> npm install react-redux
        -> npm install @reduxjs/toolkit
        -> npm install quill
        -> npm install web-vitals (Optional, if error occur)

- #### **Step #07:**
    + Now, replace the default files of the `frontend` folder with the files from the downloaded code.
    + Delete `public` and `src` folders from `frontend`.
    + Copy `public` and `src` folders  from the downloaded `frontend` folder (which is in `Task-Manager`) and paste them into this folder

### Database Configuration
There is a file `.env` in the `backend` folder that contains the database connection string.

Make sure to replace the database string with your MongoDB database string.

If you're new to MongoDB, I recommend using `MongoDB Atlas`, which is easy to set up and use.

### Run the Application
- **Backend**: To run the server, switch to the `backend` folder by running `cd backend`, and then run:
    ```
    -> node server.js
- **Frontend:** To run the React app, switch to the frontend folder by running cd frontend, and then run:
    ```
    -> npm start

### **Project View:**

![Image 1](https://github.com/Frontend-Code20/task-manager/blob/main/frontend/public/assets/ReadMEImage/loginView.png) ![Image 2](https://github.com/Frontend-Code20/task-manager/blob/main/frontend/public/assets/ReadMEImage/signupView.png)

![Image 3](https://github.com/Frontend-Code20/task-manager/blob/main/frontend/public/assets/ReadMEImage/Dashboard.png) ![Image 4](https://github.com/Frontend-Code20/task-manager/blob/main/frontend/public/assets/ReadMEImage/createList.png)

![Image 1](https://github.com/Frontend-Code20/task-manager/blob/main/frontend/public/assets/ReadMEImage/emptyList.png) ![Image 2](https://github.com/Frontend-Code20/task-manager/blob/main/frontend/public/assets/ReadMEImage/newTask.png)

![Image 3](https://github.com/Frontend-Code20/task-manager/blob/main/frontend/public/assets/ReadMEImage/taskView.png) ![Image 4](https://github.com/Frontend-Code20/task-manager/blob/main/frontend/public/assets/ReadMEImage/newlist.png)

![Image 1](https://github.com/Frontend-Code20/task-manager/blob/main/frontend/public/assets/ReadMEImage/createList.png)
