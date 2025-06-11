import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db.js';
import authRouter from './routes/authRoutes.js';
import taskRouter from './routes/taskRoutes.js';


const app = express();
dotenv.config();
connectDB();


app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors( {
    origin: process.env.FRONTEND_URL, // Allow requests from the frontend URL
    credentials: true, // Allow cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));

const PORT = process.env.PORT

// Auth routes
app.use('/api/auth', authRouter);

// Task routes
app.use('/api/tasks', taskRouter);


// Default route for unmatched paths
app.use((req, res) => {
    res.status(404).send('Wrong API path. Plase check the API documentation.');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})