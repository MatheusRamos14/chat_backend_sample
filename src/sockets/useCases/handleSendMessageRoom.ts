import { Socket } from 'socket.io';

interface ISendMessage {
    chat_id: string;
    content: string;
}

function handleSendChatMessage(socket: Socket, { chat_id, content }: ISendMessage) {
    
}

export { handleSendChatMessage };