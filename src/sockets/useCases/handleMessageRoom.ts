import { Server } from 'socket.io';

import { prisma } from '../../databases/prismaClient';

interface IRefreshMessages {
    chat_id: string;
    limit?: number;
    page?: number
}

async function handleMessageRoom(socket: Server, { chat_id, limit = 10, page = 0 }: IRefreshMessages) {
    const offset = Number(page) * Number(limit);    

    const chatMessages = await prisma.message.findMany({
        where: { chat_id },
        orderBy: { sended_at: 'desc' },
        skip: offset,
        take: Number(limit)
    })

    socket.to(chat_id).emit("chat_message_response", chatMessages);
}

export { handleMessageRoom };