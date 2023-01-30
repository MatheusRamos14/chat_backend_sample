import { Socket } from 'socket.io';

import { handleUpdateUserConnection } from '../../services/handleUserOnline';
import { searchUserSocketByUserId } from '../../services/userSocket/searchUserSocket';
import { createUserSocket } from '../../services/userSocket/createUserSocket';
import { updateUserSocket } from '../../services/userSocket/updateUserSocket';
import { fetchChats } from '../../services/fetchChats';

type UserID = { user_id: string };

function handleUserConnection(socket: Socket, { user_id }: UserID) {
    console.log("Conexão", socket.id, "refere-se ao usuário", user_id);

    searchUserSocketByUserId({ user_id })
        .then(userSocket => {
            if (!userSocket) {
                createUserSocket({ socket_id: socket.id, user_id })
                    .then(() => { console.log("User socket created!") })
            } else {
                if (userSocket.socket_id !== socket.id) {
                    updateUserSocket({ socket_id: socket.id, user_id })
                        .then(() => { console.log("User socket updated!") })
                }
            }

            handleUpdateUserConnection({ connected: true, user_id })
                .then(() => {
                    console.log("User updated to online!")
                    fetchChats({ user_id })
                    .then(chats => {
                        console.log("User chats emmited");
                        socket.join(chats.map(chat => chat.id));
                        socket.emit("refresh_response", chats);
                    })
                })  
        })
        .catch(_ => { console.log("User not found.") })
}

export { handleUserConnection };