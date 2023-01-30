import { Socket } from 'socket.io';
import { sendMessage } from '../../services/sendMessage';

import { searchUserSocketByUserId } from '../../services/userSocket/searchUserSocket';

interface IEnter {
    chat_id: string;
    action: "enter" | "leave";
}

function handleUserRoom(socket: Socket, { chat_id, action }: IEnter) {
    if (action === 'enter') socket.join(chat_id);
    else if (action === 'leave') socket.leave(chat_id);

    console.log(socket.rooms)
}

export { handleUserRoom };