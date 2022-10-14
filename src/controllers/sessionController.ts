import { Response, Request } from 'express';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { prisma } from '../databases/prismaClient';
import { validateHashedPasswords } from '../utils/validateHashedPassword';

interface ILoginRequest {
    email: string;
    password: string;
}

interface ISignUpRequest extends ILoginRequest {  
    name: string;
}

class SessionController {
    async handleLogin(req: Request, res: Response) {
        const { email, password }: ILoginRequest = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found.' });
        else if (!user.active) return res.status(400).json({ error: 'Inactivated user.' });

        if (!await validateHashedPasswords({ hashed: user.password, password }))
            return res.status(400).json({ error: 'Invalid args, please verify your login data.' });

        return res.json({
            user,
            token: jwt.sign({ user_id: user.id, },
                String(process.env.SECRET),
                { expiresIn: '1d' })
        });
    }

    async handleSignUp(req: Request, res: Response) {
        const {
            email,
            name,
            password
        }: ISignUpRequest = req.body

        const user = await prisma.user.findUnique({ where: { email } });
        if (user) return res.status(400).json({ error: 'E-mail already in use.' });

        const hashedPass = await hash(password, 6);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPass,                
            },
        });

        return res.status(201).json(newUser);
    }
}

export { SessionController }