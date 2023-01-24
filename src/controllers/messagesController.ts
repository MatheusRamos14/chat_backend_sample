import { Response, Request } from 'express';
import { prisma } from '../databases/prismaClient';

interface IMessageBody {
    chat_id: string;
    content: string;
}

class MessagesController {
    async handleSend(req: Request, res: Response) {
        const {
            chat_id,
            content
        }: IMessageBody = req.body;
        const { user_id } = req;

        const newMessage = await prisma.message.create({
            data: {
                author_id: user_id,
                chat_id,
                content,
            }
        })

        return res.status(201).json(newMessage)
    }

    async handleFetchChatMessages(req: Request, res: Response) {
        const { chat_id } = req.params;
        const { user_id } = req;
        const {
            limit = 10,
            page = 0
        } = req.query;
        const offset = Number(page) * Number(limit);

        const [search] = await prisma.usersConnection.findMany({
            where: {
                chat: { id: chat_id },
                AND: { users: { some: { id: user_id } } }
            }
        })
        if (!search) return res.status(403).json({ error: "You can't view messages that aren't related to you." })

        const chatMessages = await prisma.message.findMany({
            where: { chat_id },
            orderBy: { sended_at: 'desc' },
            skip: offset,
            take: Number(limit)
        })

        return res.json(chatMessages)
    }
}

export { MessagesController }