import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { prisma } from '../databases/prismaClient';

interface IDecodedPayload {
    user_id: string;
}

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    const token = headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Token not provided.' });

    try {
        const decoded = verify(token, String(process.env.SECRET));
        const { user_id } = decoded as IDecodedPayload;

        const user = await prisma.user.findUnique({ where: { id: user_id } });
        if (!user) throw new Error('Invalid token');

        req.user_id = user_id;
        return next();
    } catch (error) {
        console.error(error)
        return res.status(401).json({ error: 'Invalid token.' })
    }
}

export { authMiddleware }
