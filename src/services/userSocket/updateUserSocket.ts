import { prisma } from '../../databases/prismaClient';

interface IUpdateSocket {
    user_id: string;
    socket_id?: string;
}

interface IInactivateSocket {
    user_socket_id: string;
} 


async function updateUserSocket({ user_id, socket_id }: IUpdateSocket) {
    try {        
        await prisma.userSocket.updateMany({
            data: { socket_id, active: true },
            where: { user_id }
        })
    } catch (error) {
        const err = error as any;
        console.log('Unexpected trying to update user socket', err.message);
    }
}

async function InactivateUserSocket({ user_socket_id }: IInactivateSocket) {
    try {
        return await prisma.userSocket.updateMany({
            data: { active: false },
            where: { user_socket_id }
        })
    } catch (error) {
        const err = error as any;
        console.log('Unexpected trying to delete user socket', err.message);
    }
}

export { updateUserSocket, InactivateUserSocket };