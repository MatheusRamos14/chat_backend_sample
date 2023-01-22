import { Socket } from 'socket.io';

import { prisma } from '../databases/prismaClient';

export interface IMessageBody {
    user_id: string;
    chat_id: string;
    content: string;
}

async function onMessage(connection: Socket, args: IMessageBody[]) {
    const {
        user_id,
        chat_id,
        content
    }: IMessageBody = args[0];

    await prisma.message.create({
        data: {
            author_id: user_id,
            chat_id,
            content,
        }
    })

    connection.emit("response", { user_id, chat_id, content });
}

export { onMessage };