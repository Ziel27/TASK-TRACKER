import jwt from 'jsonwebtoken';

const isAuthorized = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    try {
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);
        req.user = { id: decoded.id }; // Attach user ID to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Forbidden access' });
    }
}

export default isAuthorized;