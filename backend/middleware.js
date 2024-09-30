import JWT_SECRET from "./config.js";
import jwt from 'jsonwebtoken';

async function authMiddleware(req, res, next) {
    console.log('Auth middleware executed')
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
        return res.status(403).json({});
    }
    console.log('auth token: ', req.headers.authorization)
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Auth error"
        });
    }
}

export default authMiddleware;
