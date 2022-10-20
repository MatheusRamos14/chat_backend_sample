import { Router } from "express";

import { authMiddleware } from "../middlewares/authMiddleware";
import { sessionRouter } from "./session.routes";
import { connectionsRouter } from "./connections.routes";
import { messagesRouter } from "./messages.routes";
import { chatsRouter } from "./chats.routes";

const router = Router();

// Sessão
router.use('/session', sessionRouter);

router.use(authMiddleware);
router.use('/chats', chatsRouter)
router.use('/connections', connectionsRouter);
router.use('/messages', messagesRouter);

export { router }