import { Response, Request } from 'express';
import { prisma } from '../databases/prismaClient';

class ChatsController {
    async handleFetchChats(req: Request, res: Response) {
        const { user_id } = req;

        const chats = await prisma.chat.findMany({
            where: { connection: { users: { some: { id: user_id } } } },
            include: {
                Message: {
                    orderBy: { sended_at: 'desc' }, take: 1,
                    select: { content: true, sended_at: true },                    
                }
            },
        });

        return res.json(chats)
    }
}

export { ChatsController }