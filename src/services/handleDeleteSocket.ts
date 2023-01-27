import { prisma } from '../databases/prismaClient';

interface ISocket {
    user_socket_id: string;
} 

async function handleDeleteSocket({ user_socket_id }: ISocket) {
    try {
        return await prisma.userSocket.deleteMany({            
            where: { user_socket_id }
        })    
        // return await prisma.userSocket.updateMany({
        //     data: { socket_id: '' },
        //     where: { socket_id }
        // })    
    } catch (error) {
        const err = error as any;
        console.log('Unexpected trying to delete user socket', err.message);
    }
}

export { handleDeleteSocket };