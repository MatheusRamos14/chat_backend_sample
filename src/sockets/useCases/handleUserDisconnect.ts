import { Socket } from 'socket.io';

import { searchUserSocketBySocketId } from '../../services/searchUser';
import { handleDeleteSocket } from '../../services/handleDeleteSocket';
import { handleUpdateUserConnection } from '../../services/handleUserOnline';

function handleUserDisconnection(socket: Socket) {
    searchUserSocketBySocketId({ socket_id: socket.id })
    .then(user => {
        console.log(user?.socket_id)
        if (!user) throw new Error("User not found by socket id");

        console.log("Desconexão", socket.id, "refere-se ao usuário", user.user_id);
        
        handleUpdateUserConnection({ user_id: user.user_id, connected: false })
        .then(_ => console.log("User updated to offline"))

        console.log("User socket id", user.user_socket_id);
        handleDeleteSocket({ user_socket_id: user.user_socket_id })
        .then(_ => console.log("User socket deleted."));
    })
}

export { handleUserDisconnection };