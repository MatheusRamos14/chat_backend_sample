import { Response, Request } from 'express';
import { prisma } from '../databases/prismaClient';

class ChatsController {
    async handleFetchChats(req: Request, res: Response) {
        const { user_id } = req;

        const allChats = await prisma.chat.findMany({
            where: { connection: { users: { some: { id: user_id } } } },
            include: {
                messages: {                    
                    orderBy: { sended_at: 'desc' }, take: 1,
                    select: { content: true, sended_at: true, author_id: true },
                },
                connection: {
                    select: {
                        users: {
                            where: { id: { not: { equals: user_id } } },
                            select: { id: true, name: true }
                        }
                    }
                }
            },
        });

        const fetchedChats = [];

        for await (let chat of allChats) {
            const unreadMessages = await prisma.message.count({
                where: {
                    chat_id: chat.id,
                    AND: { alreadyRead: false, AND: { author_id: { not: user_id } } },
                    
                }
            })

            fetchedChats.push({ ...chat, unread: unreadMessages })
        }
        console.log(fetchedChats)


        return res.json(fetchedChats)
    }

    async handleReadMessages(req: Request, res: Response) {
        const { user_id } = req;
        const { chat_id } = req.params;

        const messagesRead = await prisma.message.updateMany({
            where: {
                chat_id: chat_id,
                AND: { author_id: { not: user_id } }
            },
            data: {
                alreadyRead: true
            }
        })

        return res.json(messagesRead)
    }
}

export { ChatsController }