import { createServer } from 'http'
import { Server } from 'socket.io';

import { Express } from './server';
import { handleUserConnection } from './sockets/useCases/handleUserConnection';
import { handleUserDisconnection } from './sockets/useCases/handleUserDisconnect';
import { handleUserRoom } from './sockets/useCases/handleUserRoom';
import { handleUserMessage } from './sockets/useCases/handleUserMessage';
import { handleRefresh } from './sockets/useCases/handleRefresh';
import { handleMessageRoom } from './sockets/useCases/handleMessageRoom';
import { handleSendChatMessage } from './sockets/useCases/handleSendMessageRoom';

const app = new Express();
const http = createServer(app.server);
const Socket = new Server(http);

Socket.on("connection", connection => {
    console.log("An user connected", connection.id);

    // Handle insert user and socket id in database
    connection.on("new_connection", data => handleUserConnection(connection, data));

    // Handle user connect/disconnect to a room (chat)
    connection.on("chat_action", data => handleUserRoom(connection, data));

    // Handle user active room message receive (user in chat)
    connection.on("chat_message", data => handleMessageRoom(Socket, data));

    // Handle refresh users chat
    connection.on("refresh", data => handleRefresh(connection));
    
    // Handle user new message
    connection.on("new_message", data => handleUserMessage(Socket, data));

    connection.on("disconnect", _ => handleUserDisconnection(connection));
})

http.listen(process.env.SERVER_PORT, () => {
    console.log(`ENVIRONMENT: ${process.env.ENVIRONMENT}`);
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
});