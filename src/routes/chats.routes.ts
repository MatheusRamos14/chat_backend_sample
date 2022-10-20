import { Router } from 'express';
import { ChatsController } from '../controllers/chatsController';

const chatsRouter = Router();
const chatsController = new ChatsController();

chatsRouter.get('/fetch', chatsController.handleFetchChats);

export { chatsRouter };