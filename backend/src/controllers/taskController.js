import Task from '../models/task.model.js';

// Create a new task for the authenticated user
export const createTask = async (req, res) => {
    const { title, description, status, dueDate } = req.body;
    try {
        const newTask = await Task.create({
            title,
            description,
            status,
            dueDate,
            userId: req.user.id
        });

        res.status(201).json({
            message: 'Task created successfully',
            task: newTask
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Get all tasks for the authenticated user
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Get a specific task by ID for the authenticated user
export const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ _id: id, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Update a specific task by ID for the authenticated user
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;
    try {
        const updateTask = await Task.findOneAndUpdate(
            {_id: id, userId: req.user.id },
            { title, description, status, dueDate },
            { new: true, runValidators: true}
        )
        if (!updateTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({
            message: 'Task updated successfully',
            task: updateTask
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Delete a specific task by ID for the authenticated user
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({
            message: 'Task deleted successfully',
            task: deletedTask
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export default {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};