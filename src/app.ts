import { createServer } from 'http'
import { Server } from 'socket.io';

import { Express } from './server';

const app = new Express();
const http = createServer(app.server);
const Socket = new Server(http);

Socket.on("connection", connection => {
    console.log("An user connected", connection.id);

    connection.on("greeting", socket => {
        socket.emit("receive_greeting", "Hello!")
    })

    connection.on("disconnect", () => {
        console.log("An user disconnected");
    })
})

http.listen(process.env.SERVER_PORT, () => {
    console.log(`ENVIRONMENT: ${process.env.ENVIRONMENT}`);
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
});