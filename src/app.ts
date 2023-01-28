import { createServer } from 'http'
import { Server } from 'socket.io';

import { Express } from './server';
import { handleUserConnection } from './sockets/useCases/handleUserConnection';
import { handleUserDisconnection } from './sockets/useCases/handleUserDisconnect';

const app = new Express();
const http = createServer(app.server);
const Socket = new Server(http);

Socket.on("connection", connection => {
    console.log("An user connected", connection.id);    

    connection.on("new_connection", data => handleUserConnection(connection, data));

    connection.on("new_message", data => handleUserMessage(connection, data));

    connection.on("disconnect", _ => handleUserDisconnection(connection));
})

http.listen(process.env.SERVER_PORT, () => {
    console.log(`ENVIRONMENT: ${process.env.ENVIRONMENT}`);
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
});