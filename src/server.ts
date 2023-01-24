import express from 'express';

import { router } from './routes/index.routes';

class Express {
    public server;

    constructor() {
        this.server = express();

        this.configureServer();
        this.setRoutes();        
    }

    configureServer() {
        this.server.use(express.json());
    }

    setRoutes() {
        this.server.use(router);
    }
}

export { Express };