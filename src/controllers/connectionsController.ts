import { Response, Request } from 'express';

import { prisma } from '../databases/prismaClient';

class ConnectionsController {
    async handleConnect(req: Request, res: Response) {
        const { user_id: user_connected_id } = req;
        const { user_id } = req.params;

        const search = await prisma.usersConnection.findMany({
            where: {
                users: {
                    every: {
                        id: { in: [user_connected_id, user_id] }
                    }
                }
            }
        })
        // const newConnect = await prisma.usersConnection.create;

        return res.json(search);
    }
}

export { ConnectionsController }