import express from 'express';

import { router } from './routes/index.routes';

class Server {
    private server;

    constructor() {
        this.server = express();

        this.configureServer();
        this.setRoutes();

        this.server.listen(process.env.SERVER_PORT, () => {
            console.log(`ENVIRONMENT: ${process.env.ENVIRONMENT}`);
            console.log(`Server running on port ${process.env.SERVER_PORT}`);
        })
    }

    configureServer() {
        this.server.use(express.json());
    }

    setRoutes() {
        this.server.use(router);
    }
}

export default new Server();