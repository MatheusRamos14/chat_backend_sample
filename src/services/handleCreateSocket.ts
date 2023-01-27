import { prisma } from '../databases/prismaClient';

interface ISocket {
    user_id: string;
    socket_id?: string;
} 

async function handleCreateSocket({ user_id, socket_id }: ISocket) {
    try {
        await prisma.userSocket.create({
            data: { user_id, socket_id: socket_id! }
        })    
    } catch (error) {
        const err = error as any;
        console.log('Unexpected trying to create user socket', err.message);
    }
}

export { handleCreateSocket };