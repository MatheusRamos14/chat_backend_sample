import { prisma } from '../databases/prismaClient';

type ByUserId = { user_id: string; } 

type BySocketId = { socket_id: string; }

async function searchUserSocketByUserId({ user_id }: ByUserId) {
    try {
        const userSockets = await prisma.userSocket.findMany({ where: { user_id } });

        return userSockets[0];
    } catch (error) {
        const err = error as any;
        console.log('Unexpected trying to search for user socket with user id', err.message);
    }
}

async function searchUserSocketBySocketId({ socket_id }: BySocketId) {
    try {
        const userSockets = await prisma.userSocket.findMany({ where: { socket_id, AND: { active: true } } });

        return userSockets[0];
    } catch (error) {
        const err = error as any;
        console.log('Unexpected trying to search for user socket with socket id', err.message);
    }
}

export { searchUserSocketByUserId, searchUserSocketBySocketId };