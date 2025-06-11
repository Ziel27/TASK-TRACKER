# Task Tracker Application

This project is a Task Tracker application that allows users to manage their tasks efficiently. This app is created using MERN stack.

## Project Structure

```
task-tracker
├── backend
│   ├── src
│   │   ├── index.js               # Entry point for the backend application
│   │   ├── config
│   │   │   └── db.js              # Database connection setup
│   │   ├── controllers
│   │   │   ├── authController.js   # User authentication logic
│   │   │   └── taskController.js   # Task management logic
│   │   ├── middlewares
│   │   │   └── authMiddleware.js   # Middleware for authentication
│   │   ├── models
│   │   │   ├── task.model.js       # Task model schema
│   │   │   └── user.model.js       # User model schema
│   │   └── routes
│   │       ├── authRoutes.js       # Routes for user authentication
│   │       └── taskRoutes.js       # Routes for task management
│   ├── .env                        # Environment variables for the backend
│   └── package.json                # Backend dependencies and scripts
├── frontend
│   ├── src
│   │   ├── App.jsx                 # Main component for the frontend
│   │   ├── main.jsx                # Entry point for the frontend application
│   │   ├── index.css               # Global styles for the frontend
│   │   ├── api
│   │   │   └── axios.js            # Axios instance for API requests
│   │   ├── components
│   │   │   └── Navbar.jsx           # Navbar component for navigation
│   │   └── views
│   │       ├── Homepage.jsx        # Homepage component
│   │       ├── LoginPage.jsx       # Login page component
│   │       ├── RegisterPage.jsx    # Registration page component
│   │       └── TaskPage.jsx        # Task details page component
│   ├── index.html                  # Main HTML file for the frontend
│   ├── package.json                # Frontend dependencies and scripts
│   ├── vite.config.js              # Vite configuration
│   └── .env                        # Environment variables for the frontend
└── README.md                       # Project documentation
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd task-tracker
   ```

2. Set up the backend:
   - Navigate to the `backend` directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file in the `backend` directory and add your environment variables (refer to the `.env` file template provided).
   - Start the backend server:
     ```
     npm run dev
     ```

3. Set up the frontend:
   - Navigate to the `frontend` directory:
     ```
     cd ../frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file in the `frontend` directory and add your environment variables (refer to the `.env` file template provided).
   - Start the frontend application:
     ```
     npm run dev
     ```

### Usage

- Access the frontend application at `http://localhost:5173`.
- Use the application to register, log in, and manage your tasks.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
