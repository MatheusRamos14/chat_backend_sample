import { Router } from 'express';
import { MessagesController } from '../controllers/messagesController';

const messagesRouter = Router();
const messagesController = new MessagesController();

messagesRouter.get('/fetchMessagesByChat/:chat_id', messagesController.handleFetchChatMessages);
messagesRouter.post('/send', messagesController.handleSend);

export { messagesRouter };