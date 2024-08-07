import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: string;
    role: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate.' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret') as JwtPayload;
        (req as any).user = decoded;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

export default authMiddleware;
