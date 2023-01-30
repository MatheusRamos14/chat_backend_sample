import { prisma } from '../databases/prismaClient';

interface ISendMessage {
    user_id: string;
    chat_id: string;
    content: string;
}

async function sendMessage({ user_id, chat_id, content }: ISendMessage) {
    const newMessage = await prisma.message.create({
        data: {
            author_id: user_id,
            chat_id,
            content,
        }
    });

    return newMessage;
}

export { sendMessage };