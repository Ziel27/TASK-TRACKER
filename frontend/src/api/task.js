import api from "./axios";


export const createTask = async (form) => {
    if (!form.title || !form.description || !form.dueDate || !form.status) {
        throw new Error("All fields are required");
    }
    try {
        const res = await api.post('/tasks', form);
        return { success: true, status: res.status, data: res.data };
    } catch (error) {
        throw error.response?.data || { message: "Task creation failed" };
    }
}

export const getAllTasks = async () => {
    try {
        const res = await api.get('/tasks');
        return { success: true, status: res.status, data: res.data };
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch tasks" };
    }
}

// tomorrow

// Update a specific task by ID

// Delete a specific task by ID