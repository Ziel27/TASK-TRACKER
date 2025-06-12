import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerNewUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 6) {
       return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = 12
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '7d' });

        res.status(201)
        .cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expires in 7 days
        })
        .json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
            message: 'User registered successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Login an existing user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }


    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '7d' });

        res.status(200).cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expires in 7 days
        })
        .json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
            message: 'User logged in successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
// logout a user
export const logoutUser = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
    });
    
    res.status(200).json({ message: 'User logged out successfully' });
};

// verify if user is authenticated
export const verifyUser = async (req, res) => {
    const token = req.cookies.token;
    try {
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        try {
            const secretKey = process.env.JWT_SECRET;
            const decoded = jwt.verify(token, secretKey);
            const user = await User.findById(decoded.id).select('-password -__v');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                message: 'User is authenticated',
            });
            
        } catch (error) {
            console.error(error);
            return res.status(403).json({ message: 'Forbidden access' });
        }
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Forbidden access' });
    }
}
