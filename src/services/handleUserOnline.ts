import { prisma } from '../databases/prismaClient';

interface IConnection {
    connected: boolean;
    user_id: string;
    socket_id?: string;
} 

async function handleUpdateUserConnection({ connected, user_id }: IConnection) {
    try {
        await prisma.user.updateMany({
            data: { online: connected },
            where: { id: user_id }
        });    
    } catch (error) {
        const err = error as any;
        console.log('Unexpected trying to update user connecton', err.message);
    }
}

export { handleUpdateUserConnection };