import { Server } from 'socket.io';
import { sendMessage } from '../../services/sendMessage';

type Message = {
    chat_id: string,
    content: string;
};

interface IUserMessage {
    user_id: string;
    message: Message
}

function handleUserMessage(socket: Server, { user_id, message }: IUserMessage) {
    sendMessage({ user_id, chat_id: message.chat_id, content: message.content })
    .then(res => {
        socket.to(message.chat_id).emit("message_received", res)        
    })
}

export { handleUserMessage };