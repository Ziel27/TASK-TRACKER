import { Router } from 'express';
import { registerNewUser, loginUser, logoutUser, verifyUser } from '../controllers/authController.js';
import isAuthorized from '../middlewares/authMiddleware.js';

const authRouter = Router();

// Route to register a new user
authRouter.post('/register', registerNewUser);
// Route to login a user
authRouter.post('/login', loginUser);
// Route to logout a user
authRouter.post('/logout', logoutUser);
// Route to check if the user is authenticated
authRouter.get('/verify', isAuthorized, verifyUser);

export default authRouter;