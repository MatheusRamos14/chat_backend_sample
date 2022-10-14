import { Router } from "express";

import { authMiddleware } from "../middlewares/authMiddleware";
import { sessionRouter } from "./session.routes";
import { connectionsRouter } from "./connections.routes";

const router = Router();

// Sessão
router.use('/session', sessionRouter);

router.use(authMiddleware);
router.use('/connections', connectionsRouter);

export { router }