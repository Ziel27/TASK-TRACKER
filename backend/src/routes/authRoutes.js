import { Router } from 'express';
import { registerNewUser, loginUser, logoutUser } from '../controllers/authController.js';

const authRouter = Router();

// Route to register a new user
authRouter.post('/register', registerNewUser);
// Route to login a user
authRouter.post('/login', loginUser);
// Route to logout a user
authRouter.post('/logout', logoutUser);

export default authRouter;