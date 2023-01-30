import { Socket } from 'socket.io';

import { searchUserSocketBySocketId } from '../../services/userSocket/searchUserSocket';
import { fetchChats } from '../../services/fetchChats';

function handleRefresh(socket: Socket) {
    searchUserSocketBySocketId({ socket_id: socket.id })
        .then(userSocket => {
            if (!userSocket) throw new Error("This freaking user does not even exists, holy crap!");

            fetchChats({ user_id: userSocket.user_id })
                .then(chats => {
                    console.log("User chats emmited");
                    socket.emit("refresh_response", chats);
                })
        })
}

export { handleRefresh };