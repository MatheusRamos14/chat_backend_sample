import { Response, Request } from 'express';

import { prisma } from '../databases/prismaClient';

class ConnectionsController {
    async handleCreateConnection(req: Request, res: Response) {
        const { user_id: user_connected_id } = req;
        const { user_id } = req.params;

        const [search] = await prisma.usersConnection.findMany({
            where: {
                users: { every: { id: { in: [user_connected_id, user_id] } } }
            }
        })
        if (search) return res.status(400).json({ error: 'Connection already exists.' })

        const newConnection = await prisma.usersConnection.create({
            data: {
                users: {
                    connect: [{ id: user_connected_id }, { id: user_id }]
                },
                chat: {
                    create: {}
                }
            }
        })

        return res.json(newConnection);
    }

    async handleListOnlineUsers(req: Request, res: Response) {
        const usersList = await prisma.user.findMany({            
            where: { UserSocket: { active: true } }
        })

        return res.json(usersList);
    }
}

export { ConnectionsController }