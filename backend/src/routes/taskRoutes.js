import { Router } from 'express';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';
import isAuthorized from '../middlewares/authMiddleware.js';

const taskRouter = Router();

// Middleware to check if the user is authorized
taskRouter.use(isAuthorized);

// Display all tasks
taskRouter.get('/', getAllTasks);
// Display a specific task
taskRouter.get('/:id', getTaskById);
// Create a new task
taskRouter.post('/', createTask);
// Update a specific task
taskRouter.put('/:id', updateTask);
// Delete a specifi task
taskRouter.delete('/:id', deleteTask);

export default taskRouter;