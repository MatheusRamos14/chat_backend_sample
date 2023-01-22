import { Server } from 'socket.io';

import { onMessage, IMessageBody } from './message_socket';

class Sockets {
    private sockets = new Server(process.env.SOCKET_PORT);

    constructor() {
        this.setRoutes();
    }

    setRoutes() {
        this.sockets.on("connection", connection => {
            console.log("An user connected");

            connection.on("message", (...args: IMessageBody[]) => onMessage(connection, args));
            
            connection.on("disconnect", () => {
                console.log("An user disconnected");
            })
        })
    }
}

export { Sockets };