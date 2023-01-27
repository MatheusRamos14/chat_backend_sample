import { Socket } from 'socket.io';

import { handleCreateSocket } from '../../services/handleCreateSocket';
import { handleUpdateUserConnection } from '../../services/handleUserOnline';
import { handleUpdateSocket } from '../../services/handleUpdateSocket';
import { searchUserSocketByUserId } from '../../services/searchUser';

type UserID = { user_id: string };

function handleUserConnection(socket: Socket, { user_id }: UserID) {
    console.log("Conexão", socket.id, "refere-se ao usuário", user_id);

    searchUserSocketByUserId({ user_id })
        .then(userSocket => {
            if (!userSocket) {
                handleCreateSocket({ socket_id: socket.id, user_id })
                    .then(() => { console.log("User socket created!") })
            } else {
                if (userSocket.socket_id !== socket.id) {
                    handleUpdateSocket({ socket_id: socket.id, user_id })
                        .then(() => { console.log("User socket updated!") })
                }
            }

            handleUpdateUserConnection({ connected: true, user_id })
                .then(() => { console.log("User updated to online!") })
        })
        .catch(_ => { console.log("User not found.") })
}

export { handleUserConnection };