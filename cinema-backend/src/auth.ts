import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Token required' });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ error: 'Invalid token' });
            return;
        }
        (req as any).user = user;
        next();
    });
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
    if ((req as any).user?.role !== 'admin') {
        res.status(403).json({ error: 'Admin access required' });
        return;
    }
    next();
}

export function requireUser(req: Request, res: Response, next: NextFunction) {
    if ((req as any).user?.role !== 'user') {
        res.status(403).json({ error: 'User access required' });
        return;
    }
    next();
}