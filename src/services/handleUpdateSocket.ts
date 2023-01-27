import { prisma } from '../databases/prismaClient';

interface ISocket {
    user_id: string;
    socket_id?: string;
} 

async function handleUpdateSocket({ user_id, socket_id }: ISocket) {
    try {        
        await prisma.userSocket.update({
            data: { socket_id },
            where: { user_id }
        })
    } catch (error) {
        const err = error as any;
        console.log('Unexpected trying to update user socket', err.message);
    }
}

export { handleUpdateSocket };