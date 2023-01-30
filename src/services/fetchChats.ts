import { prisma } from '../databases/prismaClient';

interface IFetchChats {
    user_id: string;
}

async function fetchChats({ user_id }: IFetchChats) {
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
    console.log(fetchedChats);

    return fetchedChats;
}

export { fetchChats };