import { Router } from 'express';
import { ConnectionsController } from '../controllers/connectionsController';

const connectionsRouter = Router();
const connectionController = new ConnectionsController();

connectionsRouter.get('/create/:user_id', connectionController.handleCreateConnection);

export { connectionsRouter };